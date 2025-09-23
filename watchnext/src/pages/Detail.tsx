import {
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonPage, IonRow,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useEffect, useState} from "react";
import {getMovie, Movie, TMDB_IMG_BASE} from "../data/MoviesData";

export default function Detail() {

    const [imgBaseURL, setImgBaseURL] = useState(TMDB_IMG_BASE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState<Movie>();




    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Description</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonImg src={`${imgBaseURL}/w154/${movie?.backdrop_path}`} alt={movie?.title} />

                <IonGrid>
                    <IonRow>
                        <IonCol>Movie Title: {movie?.title} </IonCol>
                        <IonCol>Rating: {movie?.popularity}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Movie Description: {movie?.overview}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Coming Soon: {movie?.release_date}</IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

