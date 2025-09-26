import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel,
    IonPage,
    IonRow, IonSearchbar, IonSelect, IonSelectOption, IonSpinner, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './ComingSoon.css';
import React, {useEffect, useState} from "react";
import {
    Movie,
    getUpcomingMovies,
    TMDB_IMG_BASE,
    Genre,
    getMoviesGenresList,
    searchUpcomingMovies
} from "../data/MoviesData";
import {chevronBack, chevronForward} from "ionicons/icons";

const ComingSoon: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [imgBaseURL, setImgBaseURL] = useState(TMDB_IMG_BASE);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState<string>('');
    const [year, setYear] = useState<string>('2025');
    const [showFutureOnly, setShowFutureOnly] = useState<boolean>(false);

    function getMovies(pageN: number = 1) {
        setLoading(true);
        getUpcomingMovies(pageN)
            .then(res => {
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
    }

    useEffect(() => {
        if (showFutureOnly) {
            const newMovies = [...movies].filter(movie => new Date(movie.release_date) > new Date());
            setMovies(newMovies);
        }
    }, [movies]);

    function searchMovies(pageN: number = 1) {
        setLoading(true);
        searchUpcomingMovies(pageN, search, year).then(
            res => {
                setLoading(false);
                setMovies(res!.results);
                setTotalPages(res!.total_pages);
                setTotalResults(res!.total_results);
            })
            .then(
                () => {
                    getGenres();
                }
            )
            .catch(
                err => {
                    setLoading(false);
                    setError(err)
                }
            )
    }

    useEffect(() => {
        if (showFutureOnly) {
            const newMovies = [...movies].filter(movie => new Date(movie.release_date) > new Date());
            setMovies(newMovies);
        }
        else if (search.trim() != "")
            searchMovies(page)
        else
            getMovies(page);
    }, [showFutureOnly]);

    useEffect(() => {
        getMovies()
    }, []);

   useEffect(() => {
        if (search.trim() != "")
            searchMovies(page)
        else
            getMovies(page);
    }, [page, search, year]);

    function getGenres() {
        getMoviesGenresList()
            .then(res => {
                setGenres(res!);
            }).catch(err => {
            setError(err);
        });
    }

    useEffect(() => {
        movies.forEach(movie => {
            getMoviesGenresNames(movie);
        })
        setLoading(false);
    }, [genres]);

    function getMoviesGenresNames(movie: Movie) {
        movie.genre_names = [];
        movie.genre_ids.forEach(id => {
            const genre = genres.find(g => g.id === id);
            if (genre) {
                movie.genre_names.push(genre.name);
            }
        })
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
                            <IonButton fill="clear" disabled aria-hidden="true" style={{opacity: 0}}> </IonButton>
                        </IonButtons>
                        <IonTitle size="large" className="ion-text-center ion-padding" color="primary" style={{ fontWeight: 800, fontSize: '2rem' }}>
                            Upcoming Movies
                        </IonTitle>
                        <IonTitle color="success" className="ion-text-center ion-padding">{totalResults} movies found</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonGrid>
                        <IonRow className="ion-align-items-center ion-justify-content-center">
                            <IonCol size="auto">
                                <IonLabel>Future releases Only</IonLabel>
                            </IonCol>
                            <IonCol size="auto">
                                <IonCheckbox
                                    checked={showFutureOnly}
                                    onIonChange={e => setShowFutureOnly(e.detail.checked)}
                                />
                            </IonCol>
                        </IonRow>
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                        <IonCol size="4">
                    <IonSearchbar
                        placeholder="Filter by movie title"
                        value={search}
                        onIonChange={e => setSearch(e.detail.value!)}
                        color="dark"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setPage(1);
                            }}
                        }
                    />
                        </IonCol>
                        <IonCol size="2">
                            <div className="inline-year">
                                <IonLabel color="primary"  style={{marginRight: 8, fontWeight: 'bold'}}>Year</IonLabel>
                                <IonSelect
                                    value={year}
                                    onIonChange={e => setYear(e.detail.value as string)}
                                    interface="alert"
                                >
                                    <IonSelectOption value="2025">2025</IonSelectOption>
                                    <IonSelectOption value="2026">2026</IonSelectOption>
                                    <IonSelectOption value="2027">2027</IonSelectOption>
                                    <IonSelectOption value="2028">2028</IonSelectOption>
                                    <IonSelectOption value="2029">2029</IonSelectOption>
                                    <IonSelectOption value="2030">2030</IonSelectOption>
                                </IonSelect>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                </IonItem>

            <IonGrid style={{width: '100%'}}>
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                        <IonCol size="auto">
                            <IonButton onClick={() => setPage(p => p - 1)} disabled={page <= 1}>
                                <IonIcon slot="icon-only" icon={chevronBack}/>
                            </IonButton>
                        </IonCol>
                        <IonCol size="auto">
                            <IonLabel className="ion-text-center">Page {page} / {totalPages}</IonLabel>
                        </IonCol>
                        <IonCol size="auto">
                            <IonButton onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
                                <IonIcon slot="icon-only" icon={chevronForward}/>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    {movies.length === 0 && !loading &&
                        <IonItem>
                            <IonTitle color="danger" className="ion-text-center ion-padding">No movies found</IonTitle>
                        </IonItem>}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {loading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', padding: '1rem' }} aria-live="polite">
                            <IonSpinner name="crescent" />
                            <IonText>Loading upcoming movies. This may take a moment.</IonText>
                        </div>
                    )}
                    {!loading && movies.length > 0 &&
                        <IonRow>
                            {movies.map(movie => (
                                <IonCol size="6" size-sm="12" size-md="6" size-lg="4" size-xl="2" key={movie.id}>
                                    <IonCard style={{height: '100%'}} routerLink={`/movie/${movie.id}`}>
                                        <IonImg src={`${imgBaseURL}/w154/${movie.poster_path}`} alt={movie.title}/>
                                        <IonCardHeader>
                                            <IonCardTitle>{movie.title}</IonCardTitle>
                                            <IonGrid style={{width: '100%'}} className="ion-no-padding">
                                                <IonRow className="ion-justify-content-start ion-padding-vertical">
                                                    {movie.genre_names && movie.genre_names.map((name, index) => (
                                                        <IonCol key={index} size="auto" className="ion-padding-end">
                                                            <IonBadge color="tertiary">{name}</IonBadge>
                                                        </IonCol>
                                                    ))}
                                                </IonRow>
                                            </IonGrid>
                                            <IonCardSubtitle>
                                                Sortie le :
                                                <IonText color="primary" style={{marginLeft: 6, fontWeight: 600}}>
                                                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    }) : 'N/A'}
                                                </IonText>
                                            </IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent/>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}
export default ComingSoon;
