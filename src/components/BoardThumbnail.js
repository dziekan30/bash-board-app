import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteBoard } from "../actions";

const Thumbnail = styled.div`
  height: 280px;
  width: 280px;
  background: #fc28c7;
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 2px 4px grey;
`;

const Title = styled.h4`
  color: white;
  text-decoration: none;
`;

const BoardThumbnail = ({ title, id, dispatch }) => {
  console.log(title);
  const handleDeleteCard = e => {
    e.preventDefault()
    console.log(id);
    console.log(dispatch);
    dispatch(deleteBoard(id));
  };

  return (
    <div className="box">
      <div className="border">
        <Thumbnail className="">
          <Title>{title}</Title>
        </Thumbnail>
        <span className="trash material-icons MuiIcon-root-1 sc-gqjmRU inlzdN" onClick={handleDeleteCard}>delete</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  boards: state.boards
});

export default connect(mapStateToProps)(BoardThumbnail);
