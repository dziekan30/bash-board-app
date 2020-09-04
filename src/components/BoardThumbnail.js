import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteBoard } from "../actions";

const Thumbnail = styled.div`
  height: 280px;
  width: 280px;
  background: #45182e;
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
    // dispatch(deleteCard(id, listID));
  };
  return (
    <Thumbnail>
      <Title>{title}</Title>
      <button fontSize="small" onClick={handleDeleteCard}>
        delete
      </button>
    </Thumbnail>
  );
};

const mapStateToProps = state => ({
  boards: state.boards
});

export default connect(mapStateToProps)(BoardThumbnail);
