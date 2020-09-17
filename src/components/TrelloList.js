import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../actions";
import Icon from "@material-ui/core/Icon";
import Speech from 'react-speech';

const ListContainer = styled.div`
  background-color: #fd28c7;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 300px;
  padding: 5px;

`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h3`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

const style = {
      container: {
        width: '100%'
      },
      text: {
        width: '100%',
        display: ''
      },
      play: {
        hover: {
          backgroundColor: 'GhostWhite'
        },
        button: {
          width: '15%',
          height: '15%',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'Gainsboro',
          border: 'solid 1px rgba(255,255,255,1)',
          borderRadius: 6
        }
      },
      stop: {
        hover: {
          backgroundColor: 'GhostWhite'
        },
        button: {
          width: '15%',
          height: '15%',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'Gainsboro',
          border: 'solid 1px rgba(255,255,255,1)',
          borderRadius: 6
        }
      },
      pause: {
        hover: {
          backgroundColor: 'GhostWhite'
        },
        button: {
          width: '15%',
          height: '15%',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'Gainsboro',
          border: 'solid 1px rgba(255,255,255,1)',
          borderRadius: 6
        }
      },
      resume: {
        hover: {
          backgroundColor: 'GhostWhite'
        },
        button: {
          width: '15%',
          height: '15%',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'Gainsboro',
          border: 'solid 1px rgba(255,255,255,1)',
          borderRadius: 6
        }
      }
    };

let listString = "";

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {provided => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                      <div className="" onClick={() => setIsEditing(true)}>
                        <ListTitle>{listString = listTitle}</ListTitle>
                        <DeleteButton className="trash" onClick={handleDeleteList}>
                          delete
                      </DeleteButton>
                      </div>
                    )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                  <div>
                    <TrelloCard
                      key={card.id}
                      text={card.text}
                      index={index}
                      listString={listString += `Task ${(index + 1).toString()} ${card.text}`}
                      id={card.id}
                      listID={listID}
                    />
                  </div>
                  ))}
                  {provided.placeholder}
                  <TrelloCreate listID={listID} />
                </div>
                <Speech
                  stop={true}
                  play={true}
                  pause={true}
                  resume={true}
                  styles={style}
                  text={listString}
                />
              </div>
            )}
          </Droppable>
         {listString=""}
        </ListContainer>
      )}
    </Draggable>
  );  
};


export default connect()(TrelloList);
