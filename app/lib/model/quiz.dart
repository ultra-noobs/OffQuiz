import 'package:OffQuiz/model/question.dart';

class Quiz {
  String quizName;
  String date;
  String startTime;
  String endTime;
  String phoneNo;
  List<Question> questions;
  Quiz(
      {required this.quizName,
      required this.date,
      required this.startTime,
      required this.endTime,
      required this.phoneNo,
      required this.questions});
}
