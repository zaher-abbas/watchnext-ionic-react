import {
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
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
import {getMovie, getMovieVideo, Movie, MovieVideo, VideosResponse} from "../data/MoviesData";
import {useParams} from "react-router";

export default function Detail() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {movie_id} = useParams<{ movie_id: string }>();
    const id = Number(movie_id);
    const [video,setVideo]=useState<MovieVideo | null>(null);


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

    useEffect(() => {
        const fetchVideo=async () => {
            if(!id) {
                setError("ID not found.");
                setLoading(false);
                return;
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
                    <IonCard className="align-items: center">
                        {video ?(
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        title={video.name}
                                        frameBorder="0"
                                        allowFullScreen
                                    />):
                                    <p>Aucune vidéo disponible</p>
                                };
                         <IonCardHeader>
                            <IonCardTitle> {movie.title}</IonCardTitle>
                             <IonCardSubtitle color="tertiary">  Date de sortie: {movie.release_date}</IonCardSubtitle>
                         </IonCardHeader>
                        <IonCardContent>
                            Synopsis: {movie.overview}
                            <IonCardSubtitle color="success">Rating: {movie.popularity} / 100</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
}


