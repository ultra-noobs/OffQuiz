import 'package:circular_countdown_timer/circular_countdown_timer.dart';
import 'package:flutter/material.dart';

AppBar quizAppBar(String title, BuildContext context, int _duration,Function submitTest) {
  CountDownController _controller = CountDownController();
  Widget _buildPopupDialog(BuildContext context) {
    return new AlertDialog(
      title: const Text('Read this Carefully !!!'),
      content: new Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
              "Submission can only be done once. Are you sure you want to submit?"),
        ],
      ),
      actions: <Widget>[
        new TextButton(
          onPressed: () {
            Navigator.of(context).pop();
            submitTest();
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
    );
  }

  return AppBar(
    elevation: 4,
    backgroundColor: Colors.orange[700],
    iconTheme: IconThemeData(color: Colors.white),
    title: Text(
      title,
      style: TextStyle(
        fontSize: 22,
        color: Colors.white,
        fontFamily: 'AppBarFont',
        fontWeight: FontWeight.w600,
      ),
    ),
    actions: <Widget>[
      CircularCountDownTimer(
        duration: _duration,
        initialDuration: 0,
        controller: _controller,
        width: MediaQuery.of(context).size.width / 5,
        height: MediaQuery.of(context).size.height / 5,
        ringColor: Colors.grey[300]!,
        onComplete: ()=>submitTest(),
        fillColor: Colors.orangeAccent[100]!,
        backgroundColor: Colors.orange[100],
        textStyle: TextStyle(
            fontSize: 15.0,
            color: Colors.black,
            fontWeight: FontWeight.bold),
        textFormat: CountdownTextFormat.HH_MM_SS,
        isReverse: true,
        isReverseAnimation: true,
        isTimerTextShown: true,
        autoStart: true,
      ),
      ElevatedButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) => _buildPopupDialog(context),
          );
        },
        child: Text(
          "Submit",
          style: TextStyle(color: Colors.white),
        ),
      )
    ],
  );
}
