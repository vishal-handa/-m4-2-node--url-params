import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import styled from "styled-components";

const ArtistPage = () => {
  const { artistName } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`/top50/artist/${artistName}`)
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data);
      });
  }, []);

  console.log("ArtistPage.js: songs: ", songs);

  return (
    <>
      <Header pageTitle={`Songs by ${artistName}`} />
      <ul>
        {
          songs.map(song=>{
            return(
              <Div>
                <List>
                    <Span1>
                        <Rank>#{song.rank}</Rank>
                        <Streams>({song.streams})</Streams>
                    </Span1>
                    <Span2>
                        <Title>{song.title}</Title>
                        <Artist>by {song.artist}</Artist>
                    </Span2>
                    <Date>published on: {song.publicationDate}</Date>
                </List>
            </Div>
            )
          })
        }
      </ul>
    </>
  );
};

const Div=styled.div`
    padding: 20px;
`;
const List=styled.li`
    display:flex;
    flex-direction:row;
    border-bottom:1px solid black;
`;

const Span1=styled.span`
    padding:10px;
    text-align:center;
`;

const Span2=styled.span`
    padding:10px;
    width:90%;
`;
const Rank=styled.p`
    font-size:3em;
    font-weight:bolder;
`;

const Streams=styled.p`
    color:gray;
    font-size:0.75em;
`;

const Title=styled.p`
    font-size:2em;
`;

const Artist=styled.p`
    color:gray;
    font-style:italic;
`;

const Date=styled.div`
    align-self:flex-end;
    text-align:right;
    color:gray;
    font-size:0.90em;
    width:100vw;
`;

export default ArtistPage;
