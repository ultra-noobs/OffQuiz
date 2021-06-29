import 'package:OffQuiz/home/Question/questionCard.dart';
import 'package:OffQuiz/model/quiz.dart';
import 'package:OffQuiz/shared/quizAppBar.dart';
import 'package:flutter/material.dart';
import 'package:telephony/telephony.dart';
final Telephony telephony = Telephony.instance;


class QuizScreen extends StatefulWidget {
  Quiz quiz;
  QuizScreen({required this.quiz});

   @override
  _QuizScreenState createState() => _QuizScreenState();
}

 List<QuestionCard> questionCards = [];

class _QuizScreenState extends State<QuizScreen> {
  var response = new Map();
  void setAnswer(index,option){
    response[index] = option;
  }
  void submitTest(){
    String ans = widget.quiz.quizName + "-" + widget.quiz.date + "\n";
    for(int i=1;i<=widget.quiz.questions.length;i++){
        ans += (i).toString() + ") ";
            if(response[i]==null){
              ans +="not attempted ";
            }else{
              ans += response[i].toString() + " ";
            }
    }
    telephony.sendSms(
      to: widget.quiz.phoneNo,
      message: ans
    );
    Navigator.pop(context);
  }
  fetchAllQuestions(questions) {
    List<QuestionCard> allQuestions = [];
    for (int i = 0; i < questions.length; i++) {
      allQuestions.add(QuestionCard(
        question: questions[i],
        index: (i + 1),
        setAnswer:setAnswer
      ));
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: quizAppBar("OffQuiz", context, 3600,submitTest),
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
