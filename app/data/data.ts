type Music = {
    name: string;
    url: string;
    image: string;
    artista: string;
}

const musics:Music[] = [
    {
     name: "Twin Flame",
     url: "./audios/WB.mp3",
     image: "./images/WB.jpg",
     artista: "Weyes Blood"  
    },
    {
     name: "The Fine Print",
     url: "./audios/KG.mp3",
     image: "./images/KG.jpg",
     artista: "King Geedorah"  
    },
    {
     name: "Big Love",
     url: "./audios/FM.mp3",
     image: "./images/FM.jpg",
     artista: "Fleetwood Mac"  
    }

]
export default musics;