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
import {getMovieDetails, MovieDetails, TMDB_IMG_BASE} from "../data/MoviesData";

export default function Detail() {
    const [movieDetails, setMovieDetail] = useState<MovieDetails | null>();
    const [imgBaseURL, setImgBaseURL] = useState(TMDB_IMG_BASE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movie_id, setMovie_id] = useState<number |null>(0);

    useEffect(()=> {
        getMovieDetails(movie_id).then(res =>
            setMovieDetail(res)
        ).catch(error => {
            setLoading(false);
            setError(error);
    });
    })


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Description</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonImg src={`${imgBaseURL}/w154/${movieDetails?.poster_path}`} alt={movieDetails?.title} />

                <IonGrid>
                    <IonRow>
                        <IonCol>Movie Title: {movieDetails?.title} </IonCol>
                        <IonCol>Rating: {movieDetails?.popularity}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Movie Description: {movieDetails?.overview}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Comming Soon: {movieDetails?.release_date}</IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

