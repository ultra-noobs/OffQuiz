import 'package:OffQuiz/model/question.dart';
import 'package:flutter/material.dart';

class QuestionCard extends StatefulWidget {
  Question question;
  int index;
  Function setAnswer;
  QuestionCard({required this.question, required this.index,required this.setAnswer});
  var _radioValue;

  @override
  _QuestionCardState createState() => _QuestionCardState();
}

class _QuestionCardState extends State<QuestionCard> {
  void _handleRadioValueChange(value) {
    setState(() {
      widget._radioValue = value;
    });
    widget.setAnswer(widget.index,value);
  }

  fetchOptions() {
    List<RadioListTile> listOptions = [];
    for (int i = 0; i < widget.question.options.length; i++) {
      listOptions.add(
        RadioListTile(
          groupValue: widget._radioValue,
          onChanged: _handleRadioValueChange,
          value: i,
          title: Text(
            "${String.fromCharCode(i + 97)}. ${widget.question.options[i]}",
            style: TextStyle(fontSize: 16),
          ),
        ),
      );
    }
    return listOptions;
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Q${widget.index}) ${widget.question.ques}",
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 15),
            Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: fetchOptions())
          ],
        ),
      ),
    );
  }
}
