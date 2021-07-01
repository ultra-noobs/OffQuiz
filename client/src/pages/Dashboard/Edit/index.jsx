import { React, useState, useEffect } from "react"
import './edit.scss'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { Icon, Button, Container, Header, Form, Dropdown } from 'semantic-ui-react'
import Axios from 'axios';
import useToken from '../../../utils/customHooks/token'
import Loader from '../../../components/Loader/index'
import HamburgerMenu from '../../../components/HamburgerMenu/index';
import useAuthStatus from "../../../utils/customHooks/user";

const Edit = () => {

    const history = useHistory();
    const { getToken } = useToken();
    const { id } = useParams();
    const { getStatus } = useAuthStatus();
    var [isLoading, setLoading] = useState(true);
    var [auth, setAuth] = useState();
    const [previousQuestion, setPreviousQuestion] = useState([])
    const [count, setCount] = useState(0);
    const [quizDateAndTimeAndTitleAndBatch, setQuizDateAndTimeAndTitleAndBatch] = useState({ date: '', time: '', title: '', batch: '' })
    const [batches, setBatches] = useState([]);
    const token = getToken();
    const incrementCounter = () => {
        setCount(count + 1);
    }
    const buttonStyle = { marginTop: "15px" }
    const setQuestion = (index,e) =>{
        let questions = [...previousQuestion];
        questions[index][e.target.name] = e.target.value;
        setPreviousQuestion(questions);
    }
    const showPreviousQuestion = () => previousQuestion.map((ele, index) =>
        <Form.Field >
            <label style={buttonStyle}>Question: {index}</label>
            <input style={buttonStyle} placeholder="Enter your question" onChange={(e)=>setQuestion(index,e)} value={ele.question} name="question"  id={"question"} />
            <label style={buttonStyle}> Add options for question : {index} </label>
            <input style={buttonStyle} placeholder="a)option1 b)option2 c)option3" onChange={(e)=>setQuestion(index,e)} value={ele.answer} name="answer" id={"answer"} />
        </Form.Field>
    );

    const renderQuestionInput = () => {
        let rows = [];
        for (let i = 0; i < count; i++) {
            let index = previousQuestion.length + i;
            rows.push(<Form.Field >
                <label style={buttonStyle}>Question: {index}</label>
                <input style={buttonStyle} placeholder="Enter your question" name={"question" + index} id={"question"} />
                <label style={buttonStyle}> Add options for question : {index}</label>
                <input style={buttonStyle} placeholder="a)option1 b)option2 c)option3" name={"options" + index} id={"answer"} />
            </Form.Field>)
        }
        return <div>{rows}</div>
    }

    const saveAndParse = async () => {
        try {
            let questions = document.querySelectorAll("#question");
            let answers = document.querySelectorAll("#answer");
            let i = 0;
            let questionAndAnswers = [];
            questions.forEach((ele) => {
                if (ele.value.trim() !== "" && answers[i].value.trim() !== "") {
                    questionAndAnswers.push({ question: ele.value, answer: answers[i].value })
                }
                i++;
            });
            const quizInfo = {
                finalQuizArray:questionAndAnswers,
                time: quizDateAndTimeAndTitleAndBatch.time,
                date: quizDateAndTimeAndTitleAndBatch.date,
                title: quizDateAndTimeAndTitleAndBatch.title,
                batch: quizDateAndTimeAndTitleAndBatch.batch,
                endtime: quizDateAndTimeAndTitleAndBatch.endtime,
                phno: quizDateAndTimeAndTitleAndBatch.phno,
                isCirculated:false
            }
            const response = await Axios.put(
                `https://peaceful-island-93608.herokuapp.com/dashboard/updateQuiz/${id}`,
                {quizInfo},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            history.push('/dashboard');
        } catch (error) {
            console.log(error.message); 
        }
    }

    useEffect(async () => {
        const isAuthenticated = await getStatus();
        setAuth(isAuthenticated);
        if (!isAuthenticated) {
            setLoading(false);
        } else {
            let endpoint = "https://peaceful-island-93608.herokuapp.com/dashboard/editInfo/" + id;
            let response = await Axios.get(endpoint, {
                headers: {
                    Authorization: token,
                }
            });
            setQuizDateAndTimeAndTitleAndBatch({
                date: response.data.date,
                time: response.data.time,
                title: response.data.title,
                batch: response.data.batch,
                endtime: response.data.endtime,
                phno: response.data.phno,
            })
            setBatches(response.data.batchInfo)
            setPreviousQuestion(response.data.finalQuizArray)
            setLoading(false);
        }
    }, [])

    const setDateAndTimeAndTitle = (e) => {
        setQuizDateAndTimeAndTitleAndBatch({
            ...quizDateAndTimeAndTitleAndBatch,
            [e.target.name]: e.target.value
        });
    };

    const handleBatchSelection = (event, data) => {
        setQuizDateAndTimeAndTitleAndBatch({
            ...quizDateAndTimeAndTitleAndBatch,
            [data.name]: data.value
        });
    }


    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && !auth && <Redirect to="/login" />}
            {!isLoading && auth && (
                <HamburgerMenu>
                    <Container>
                        <Header> Update Your Quiz <Button primary floated="right" onClick={() => saveAndParse()} > <Icon name='save' /> Save </Button> </Header>
                        <Form>
                            <label>Quiz Title</label>
                            <input style={buttonStyle} value={quizDateAndTimeAndTitleAndBatch.title} name="title" onChange={(e) => setDateAndTimeAndTitle(e)} type="text"></input>
                            <label style={buttonStyle}>Select quiz batch </label> <br />
                            <Dropdown style={buttonStyle} floated="right" value={quizDateAndTimeAndTitleAndBatch.batch} clearable options={batches} name="batch" selection onChange={(e, data) => handleBatchSelection(e, data)} /> <br />
                            <label style={buttonStyle}>Enter quiz timing </label>
                            <input style={buttonStyle} value={quizDateAndTimeAndTitleAndBatch.date} name="date" onChange={(e) => setDateAndTimeAndTitle(e)} type="date"></input>
                            <input style={buttonStyle} value={quizDateAndTimeAndTitleAndBatch.time} name="time" onChange={(e) => setDateAndTimeAndTitle(e)} type="time"></input>
                            <input style={buttonStyle} value={quizDateAndTimeAndTitleAndBatch.endtime} name="endtime" onChange={(e) => setDateAndTimeAndTitle(e)} type="time"></input>
                            <input style={buttonStyle} value={quizDateAndTimeAndTitleAndBatch.phno} name="phno" onChange={(e) => setDateAndTimeAndTitle(e)} type="number"></input>
                            <h3>Questions</h3>
                            {showPreviousQuestion()}
                            {renderQuestionInput()}
                        </Form>
                        <Button icon style={buttonStyle} labelPosition='left' floated="right" onClick={incrementCounter}>
                            <Icon name='add' />
                            Add
                        </Button>
                    </Container>
                </HamburgerMenu>
            )}
        </div>
    );
}

export default Edit;