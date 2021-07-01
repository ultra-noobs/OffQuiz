import 'package:OffQuiz/home/Quiz/quizScreen.dart';
import 'package:OffQuiz/model/quiz.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class QuizCard extends StatefulWidget {
  Quiz quiz;
  QuizCard({required this.quiz});

  @override
  _QuizCardState createState() => _QuizCardState();
}

class _QuizCardState extends State<QuizCard> {
  double pad = 70;
  final double elevation = 4;

  bool checkStatus(){
    String currentDate = DateFormat("yyyy-MM-dd").format(DateTime.now());
    String quizDate = widget.quiz.date;
    String quizStartTime  =widget.quiz.startTime;
    String quizEndTime = widget.quiz.endTime;
    String currentTime = DateFormat("kk:mm").format(DateTime.now());
    if(currentDate!=quizDate) return false;
    bool isStart = currentTime.compareTo(quizStartTime)>=0;
    bool isEnd = currentTime.compareTo(quizEndTime)>=0;
    if(isStart && !isEnd) return true;
    return false;
  }

  Widget _buildPopupDialog(BuildContext context) {
    bool val = checkStatus();
    return val?new AlertDialog(
      title: Text('Read this Carefully !!!'),
      content: new Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
              "You can attempt the quiz only once. DO NOT close the app while attempting quiz. Are you sure you want to start the quiz?"),
        ],
      ),
      actions: <Widget>[
        new TextButton(
          onPressed: () {
            Navigator.of(context).pop();
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => QuizScreen(
                          quiz: widget.quiz,
                        )));
          },
          child: const Text('Yes'),
        ),
        new TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('No'),
        ),
      ],
    ):new AlertDialog(
      title: Text("Sorry, You Can't Open This Quiz!"),
      content: new Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
              "Either The Quiz is Not Started or Quiz is Already Finished."),
        ],
      ),
      actions: <Widget>[
        new TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('OK'),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        showDialog(
          context: context,
          builder: (BuildContext context) => _buildPopupDialog(context),
        );
      },
      child: Card(
        margin: EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 0),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(28.0, 15.0, 24.0, 15.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(
                height: 20.0,
              ),
              Text(
                widget.quiz.quizName,
                style: TextStyle(
                  fontSize: 24.0,
                  color: Colors.grey[800],
                ),
              ),
              SizedBox(
                height: 30.0,
              ),
              Text(
                "Date : " + widget.quiz.date,
                style:TextStyle(color:Colors.grey[600],fontSize:18)
              ),
              SizedBox(
                height: 20.0,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Scheduled at " + widget.quiz.startTime,
                    style: TextStyle(color: Colors.grey[600], fontSize: 16),
                  ),
                  Text(
                    "Quiz Closes on " + widget.quiz.endTime,
                    style: TextStyle(color: Colors.grey[600], fontSize: 16),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
