import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel,
    IonPage,
    IonRow, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import React, {useEffect, useState} from "react";
import {
    Movie,
    getUpcomingMovies,
    MoviesResponse,
    TMDB_IMG_BASE,
    Genre,
    getMoviesGenresList
} from "../data/MoviesData";
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
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getUpcomingMovies(page).then(res => {
            setMovieResponse(res)
            setMovies(res!.results);
            setTotalPages(res!.total_pages);
            setTotalResults(res!.total_results);
        }).then(() => {
                getGenres();
            }
        ).catch(err => {
            setLoading(false);
            setError(err)
        });
    }, [page]);

    useEffect(() => {
        movies.forEach(movie => {
            getMoviesGenresNames(movie);
        })
        setLoading(false);
    }, [movies, genres]);

    function getGenres() {
        getMoviesGenresList().then(res => {
            setGenres(res!);
            console.log("genres:", res);
        }).catch(err => {
            setError(err);
        });
    }

    function getMoviesGenresNames(movie: Movie) {
        movie.genre_names = [];
        movie.genre_ids.forEach(id => {
            const genre = genres.find(g => g.id === id);
            if (genre) {
                movie.genre_names.push(genre.name);
            }
        })
        console.log("movie:", movie);
    }

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
        {!loading &&
        <IonRow>
            {movies.map(movie => (
                <IonCol size="6" size-sm="12" size-md="6" size-lg="4" size-xl="2" key={movie.id}>
                    <IonCard>
                        <IonImg src={`${imgBaseURL}/w154/${movie.poster_path}`} alt={movie.title} />
                        <IonCardHeader>
                            <IonCardTitle>{movie.title}</IonCardTitle>
                            <IonGrid style={{ width: '100%' }}>
                                <IonRow className="ion-justify-content-start">
                                    {movie.genre_names && movie.genre_names.map((name, index) => (
                                        <IonCol key={index} size="auto">
                                            <IonBadge color="tertiary">{name}</IonBadge>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonGrid>
                            <IonCardSubtitle>
                                Sortie le :
                                <IonText color="primary" style={{ marginLeft: 6, fontWeight: 600 }}>
                                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' }) : 'N/A'}
                                </IonText>
                            </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent />
                    </IonCard>
                </IonCol>
            ))}
        </IonRow>}
    </IonGrid>
            </IonContent>
        </IonPage>
    );
};
export default ComingSoon;
