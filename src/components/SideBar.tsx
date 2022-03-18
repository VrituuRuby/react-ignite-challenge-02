import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  //created to recieve state and function from App component
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({selectedGenreId, handleClickButton} : SideBarProps) {
  //genres state its only used inside SideBar
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    //requests from fake api the existent genres
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            //creates buttons for each existent genre in the fake api
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}