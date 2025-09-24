import {
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,

    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useEffect, useState} from "react";
import {getMovie, getMovieVideo, Movie, MovieVideo} from "../data/MoviesData";
import {useParams} from "react-router";

export default function Detail() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {movie_id} = useParams<{ movie_id?: string }>();
    const [video,setVideo]=useState<MovieVideo | null>(null);
    const [id, setId] = useState<number|null> (null)

    useEffect(() => {
        if (movie_id) {
            setId(Number(movie_id));
        }
    }, [movie_id])

    useEffect(() => {
        const fetchMovie = async () => {
            setError(null);
            if (id === null) {
                setError("ID not found.");
                setLoading(false);
                return null;
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

    useEffect(() => {
        const fetchVideo=async () => {
            setError(null);
            if(id === null) {
                setError("ID not found.");
                setLoading(false);
                return null;
            }
            try {
                const data = await getMovieVideo(id);
                if (data && data.results.length > 0) {
                    setVideo(data.results[0])
                }
            } catch(err) {
                console.error("TMDB error", err);
                setError("error fetching videos");
            }
            setLoading(false);
        };
        fetchVideo();
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
                    <IonCard style={{ marginTop: "5rem" }} >
                        {video ?
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        title={video.name}
                                        frameBorder="0"
                                        allowFullScreen
                                        style={{borderRadius: "10px"}}
                                    /> :
                                    <p>Aucune vidéo disponible</p>
                                }
                         <IonCardHeader style={{padding: "auto"}}>
                            <IonCardTitle style={{marginTop: "0.5rem"}}> {movie.title}</IonCardTitle>
                             <IonCardSubtitle color="tertiary">  Date de sortie: {movie.release_date}</IonCardSubtitle>
                         </IonCardHeader>
                        <IonCardContent color="primary" style={{padding:"auto"}}>
                             Synopsis: {movie.overview}
                            <IonCardSubtitle color="success" style={{paddingTop: "1rem"}}>Rating: {movie.popularity} / 100</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
}



