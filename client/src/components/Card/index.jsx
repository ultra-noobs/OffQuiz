import "./Card.scss"
import React from 'react'
import { useHistory } from "react-router"
import { Card, Label, Button } from 'semantic-ui-react'
import Axios from 'axios'
import useToken from "../../utils/customHooks/token"
import { NavLink } from "react-router-dom"

const CardReactComponent = (props) => {

  const { data, id } = props.quizInfo;
  const history = useHistory();
  const { getToken } = useToken();
  const deleteQuiz = async (quizId) => {
    const token = getToken();
    const endpoint = 'http://localhost:5000/dashboard/delete/' + quizId;
    try {
    await Axios.get(endpoint,{
      headers: {
        Authorization: token,
      }});
      window.location.reload()
    history.push('/dashboard') 
    }catch(err) {
      console.log(err);
    }
  }

  return(
  <Card>
    {(data.isCirculated) ? <Label color={"green"} key={"orange"}> Circulated </Label>: <Label color={"red"} key={"orange"}> Not circulated </Label>}
    {(!!data.title) ? <Card.Content header={data.title } />:<Card.Content header="Quiz" /> }
    <Card.Content>
      <p>date: {data.date}</p>
      <p>Time: {data.time}</p>
      <Button icon="trash" primary floated="right" onClick={() => deleteQuiz(id)} />
      <NavLink
        exact
        activeClassName="current"
        to={`/dashboard/view/${id}`}
      >
      <Button icon="eye" primary floated="right" />
      </NavLink>
    </Card.Content>
  </Card>)
}

export default CardReactComponent;