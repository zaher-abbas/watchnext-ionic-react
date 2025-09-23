import {
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonPage, IonRow,

    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useEffect, useState} from "react";
import {getMovie, Movie, TMDB_IMG_BASE} from "../data/MoviesData";
import {useParams} from "react-router";

export default function Detail() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {movie_id} = useParams<{ movie_id: string }>();
    const id = Number(movie_id);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!id) {
                setError("ID not found.");
                setLoading(false);
                return;
            }
            try {
                const data = await getMovie(id);
                if (data) {
                    setMovie(data);
                } else {
                    setError("movie not found");
                }
            } catch (err) {
                console.error("TMDB error", err);
                setError("error fetching movies");
            }
            setLoading(false);

        };
        fetchMovie();
    }, [id]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Description</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading && <p>Loading...</p>}
                {error && <p style={{color: 'red'}}>{error}</p>}
                {movie && !loading && (
                    <IonGrid>
                        <IonRow>
                            <IonCol> <IonImg src={`${TMDB_IMG_BASE}/w500/${movie.backdrop_path}`}
                                             alt={movie.title}/></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Movie Title: {movie.title}</IonCol>
                            <IonCol>Rating: {movie.popularity}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Movie Description: {movie.overview}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Release Date: {movie.release_date}</IonCol>
                        </IonRow>
                    </IonGrid>
                )}
            </IonContent>
        </IonPage>
    );
}

