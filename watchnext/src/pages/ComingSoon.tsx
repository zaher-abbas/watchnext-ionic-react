import {
    IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import React, {useEffect, useState} from "react";
import {Movie, getUpcomingMovies, MoviesResponse, TMDB_IMG_BASE} from "../data/MoviesData";
import {chevronBack, chevronForward} from "ionicons/icons";

const ComingSoon: React.FC = () => {
    const [movieResponse, setMovieResponse] = useState<MoviesResponse | null>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [imgBaseURL, setImgBaseURL] = useState(TMDB_IMG_BASE);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);


    useEffect(() => {
            getUpcomingMovies(page).then(res => {
                setMovieResponse(res)
                setMovies(res!.results);
                setLoading(false);
                setTotalPages(res!.total_pages);
                setTotalResults(res!.total_results);
            }).catch(err => {
                setLoading(false);
                setError(err)
            });
    }, [page]);

    useEffect(() => {
        console.log("page:" , page)
    }, [page]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>WatchNext</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton fill="clear" disabled aria-hidden="true" style={{ opacity: 0 }}> </IonButton>
                        </IonButtons>
                        <IonTitle size="large" className="ion-text-center">Upcoming Movies</IonTitle>
                        <IonButtons slot="end">
                            <IonButton fill="clear" disabled aria-hidden="true" style={{ opacity: 0 }}> </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel className="ion-text-center">{totalResults} movies found</IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonGrid style={{ width: '100%' }}>
                        <IonRow className="ion-align-items-center ion-justify-content-center">
                            <IonCol size="auto">
                                <IonButton onClick={() => setPage(p => p-1)} disabled={page <= 1}>
                                    <IonIcon slot="icon-only" icon={chevronBack} />
                                </IonButton>
                            </IonCol>
                            <IonCol size="auto">
                                <IonLabel className="ion-text-center">Page {page} / {totalPages}</IonLabel>
                            </IonCol>
                            <IonCol size="auto">
                                <IonButton onClick={() => setPage(p => p+1)} disabled={page >= totalPages}>
                                    <IonIcon slot="icon-only" icon={chevronForward} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        {movies.map(movie => (
                            <IonCol size="6" size-sm="12" size-md="6" size-lg="4" size-xl="2" key={movie.id}>
                                <IonCard routerLink={'/movie/'+movie.id}>
                                    <IonImg src={`${imgBaseURL}/w154/${movie.poster_path}`} alt={movie.title} />
                                    <IonCardHeader>
                                        <IonCardTitle>{movie.title}</IonCardTitle>
                                        <IonCardSubtitle>
                                            Sortie Le: {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "N/A"}
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent />
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
export default ComingSoon;
