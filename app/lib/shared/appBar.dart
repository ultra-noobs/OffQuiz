import 'package:flutter/material.dart';

AppBar appBar(String title) {
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
  );
}
