import 'package:OffQuiz/home/Question/questionCard.dart';
import 'package:OffQuiz/model/quiz.dart';
import 'package:OffQuiz/shared/quizAppBar.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:telephony/telephony.dart';

final Telephony telephony = Telephony.instance;
class Pair<T1,T2> {
    T1 first;
    T2 second;
    Pair(this.first, this.second);
}
class QuizScreen extends StatefulWidget {
  Quiz quiz;
  QuizScreen({required this.quiz});

  @override
  _QuizScreenState createState() => _QuizScreenState();
}

List<QuestionCard> questionCards = [];

class _QuizScreenState extends State<QuizScreen> {
  var response = new Map();
  void setAnswer(index, option) {
    response[index] = option;
  }

  void submitTest() {
    String ans = widget.quiz.quizName + "-" + widget.quiz.date + "\n";
    for (int i = 1; i <= widget.quiz.questions.length; i++) {
      ans += (i).toString() + ") ";
      if (response[i] == null) {
        ans += "not attempted ";
      } else {
        ans += response[i].toString() + " ";
      }
    }
    telephony.sendSms(to: widget.quiz.phoneNo, message: ans);
    Navigator.pop(context);
  }

  fetchAllQuestions(questions) {
    List<QuestionCard> allQuestions = [];
    for (int i = 0; i < questions.length; i++) {
      allQuestions.add(QuestionCard(
          question: questions[i], index: (i + 1), setAnswer: setAnswer));
    }
    if (allQuestions.length == 0) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: Text(
              "Please contact your teacher, he hasn't added any question in the Quiz XD",
              style: TextStyle(fontSize: 16),
            ),
          ),
        ],
      );
    }
    return ListView(children: allQuestions);
  }

  Pair<int,int> getHourAndMin(String time){
    String hr = "",min = "";
    int i=0;
    while (time[i] != ':') {
      hr += time[i];
      i++;
    }
    i++;
    while (i < time.length) {
      min += time[i];
      i++;
    }
    return Pair(int.parse(hr),int.parse(min));
  }

  getDuration() {
    String start = widget.quiz.startTime;
    String currentTime = DateFormat("kk:mm").format(DateTime.now());
    String end = widget.quiz.endTime;
    int startHr = 0, startMin = 0, endHr = 0, endMin = 0,currentHr=0,currentMin=0;
    Pair<int,int> pr = getHourAndMin(start);
    startHr = pr.first;
    startMin = pr.second;
    pr = getHourAndMin(end);
    endHr = pr.first;
    endMin = pr.second;
    pr = getHourAndMin(currentTime);
    currentHr = pr.first;
    currentMin = pr.second;
    if(startHr < currentHr || startMin < currentMin){
      startHr = currentHr;
      startMin = currentMin;
    }
    if (startHr == endHr) {
      return (endMin - startMin) * 60;
    }
    int ans = 0;
    ans = 60 - startMin;
    startHr++;
    ans +=endMin;
    ans += (endHr - startHr) * 60;
    return ans*60;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: quizAppBar("OffQuiz", context, getDuration(), submitTest),
      body: Column(
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(28.0, 15.0, 24.0, 15.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    widget.quiz.quizName,
                    style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: Container(
              child: fetchAllQuestions(widget.quiz.questions),
            ),
          ),
        ],
      ),
    );
  }
}
