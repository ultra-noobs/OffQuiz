import React from "react";
import { Divider } from "semantic-ui-react";
import "./About.scss";
import Navbar from "../../../components/Navigation";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-body">
        <div className="header">About OffQuiz</div>
        <Divider />

        <div className="sub-header">The Problem!!</div>

        <div className="para">
          You got a quiz? Worried about poor internet connectivity? Don't worry
          we got your covered !!!
        </div>

        <div className="para">
          Poor Internet connectivity due to various reasons can hamper the
          performance of a potential candidate and ruin their entire hardwork.
          It also decreases the accuracy of judgement of one's skills and
          knowledge. Nowadays, during the global pandemic, the educational
          sector has migrated online and even the exams are being conducted
          online without considering that not every one can manage to get fast
          and secured internet connectivity.
        </div>

        <Divider />
        <div className="sub-header">What is OffQuiz?</div>

        <div className="para">
          OffQuiz can be considered to be an aid in the age of uncertain
          internet connectivity. OffQuiz is a competent assessment platform
          which provides an secure offline environment to conduct multiple
          choice type quizzes.
        </div>

        <Divider />

        <div className="sub-header">How Does it work?</div>

        <div className="para">
          <ul>
            <li className="points">
              Teacher can use the web portal to form batches of students.
            </li>
            <li className="points">
              Quiz can be created on the web portal by the teacher.
            </li>
            <li className="points">
              All the created quizzes can be viewed on the dashhboard.
            </li>
            <li className="points">
              Once the quiz is created the teacher can circulate the quiz within
              an already created batch of students.
            </li>
            <li className="points">
              At the students end, all you require is a smartphone with incoming
              sms facility.
            </li>
            <li className="points">
              Students receive a encrypted message on their phone which the
              OffQuiz App decrypts and display the Quiz on screen.
            </li>
            <li className="points">
              INTERNET CONNECTION IS NOT REQUIRED AT THE STUDENTS' END TO
              ATTEMPT THE QUIZ.
            </li>
            <li className="points">
              The Quiz Responses are encrypted and sent to our servers through
              sms.
            </li>
            <li className="points">
              Teacher can view the responses of all the student on our web
              application.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
