import 'package:flutter/material.dart';
import 'home/home.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'OffQuiz',
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: Home(
        title: 'OffQuiz',
      ),
    );
  }
}
