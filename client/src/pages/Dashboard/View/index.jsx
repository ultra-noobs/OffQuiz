import { React, useEffect, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom";
import './View.scss'
import Question from '../../../components/Question/index'
import { Container, Divider, Button,Message,Modal } from "semantic-ui-react";
import HamburgerMenu from '../../../components/HamburgerMenu/index'
import Loader from '../../../components/Loader/index'
import useToken from '../../../utils/customHooks/token'
import useAuthStatus from "../../../utils/customHooks/user";
import Axios from 'axios'

const View = () => {
  const { getToken } = useToken();
  const history = useHistory();
  const { getStatus } = useAuthStatus();
  var [isLoading, setLoading] = useState(true);
  var [auth, setAuth] = useState();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const { id } = useParams();
  const token = getToken();
  const [err,setError] = useState(false);
  const [open,setOpen] = useState(false);

  useEffect(() => {
    let endpoint = "https://peaceful-island-93608.herokuapp.com/dashboard/view/" + id;

    Axios.get(endpoint, {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      console.log(response.data)
      setCurrentQuiz(response.data);
      getStatus()
      .then((response) => {
        setAuth(response);
        setLoading(false);
      })
    })
  }, [])

  const closeDialog = ()=>{
    setOpen(false);
    history.push('/dashboard')
  }
  const renderQuestions = () => currentQuiz.finalQuizArray.map((element, index) =>
    <Question question={element.question} options={element.option} index={index + 1} />
  );

  const circulateQuiz = async () => {
    try {
      const response = await Axios.get(
        `https://peaceful-island-93608.herokuapp.com/dashboard/circulate/${id}`,
       {
        headers: {
          Authorization: token,
        }
      })
      console.log(response.data.msg);
      setOpen(true);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  }

  const editQuiz = ()=>{
    history.push(`/dashboard/edit/${id}`);
  }

  return (
    <HamburgerMenu>
      <div>
        {isLoading && <Loader />}
        {!isLoading && !auth && <Redirect to="/login" />}
        {!isLoading && auth && (
          <Container>
            <h2 className="heading">{currentQuiz.title}<Button floated="right" onClick={editQuiz} >Edit</Button><Button floated="right" onClick={circulateQuiz} >Circulate</Button> </h2>
            <span>StartTime : {currentQuiz.time}, Endtime: {currentQuiz.endtime}, Date : {currentQuiz.date}, Batch: {currentQuiz.batch}, Responses no: {currentQuiz.phno}</span>
            <Divider />
            {renderQuestions()}
            <Modal
                onClose={closeDialog}
                onOpen={() => setOpen(true)}
                open={open}
              >
                <Modal.Header>Hurray !! Quiz Successfully Circulated</Modal.Header>
                <Modal.Content>
                  <div>All the students of this batch will receive a sms on their registered mobile number.</div>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={closeDialog}>Close</Button>
                </Modal.Actions>
              </Modal>
            {err && <Message error header="Oops!!" content="Some Error Occured While Circulating Quiz." /> }
          </Container>)}
      </div>
    </HamburgerMenu>
  );
}

export default View;