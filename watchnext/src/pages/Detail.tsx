import {
    IonBadge,
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonImg,
    IonPage, IonRouterLink, IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {
    getMovie,
    getMovieVideo,
    Movie,
    MovieVideo,
    TMDB_IMG_BASE
} from "../data/MoviesData";
import {useParams} from "react-router";
import {chevronBack} from "ionicons/icons";

export default function Detail() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {movie_id} = useParams<{ movie_id?: string }>();
    const [videoList, setVideoList] = useState<MovieVideo[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [id, setId] = useState<number|null> (null);
    const [imgBaseURL, setImgBaseURL] = useState(TMDB_IMG_BASE);

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
                    const filteredVideos = data.results.filter(
                        (vid) => vid.site === "YouTube" || vid.site === "Vimeo"
                    );
                    setVideoList(filteredVideos);
                    setCurrentVideoIndex(0);
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
                    <IonGrid>
                        <IonRow className="ion-align-items-center ion-justify-content-start">
                            <IonCol size="auto">
                                <IonRouterLink href={"/comingsoon"}>
                                    <IonButton size="small">
                                        <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
                                    </IonButton>
                                </IonRouterLink>
                            </IonCol>
                            <IonCol size="auto">
                                <IonTitle>Description</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading && <p>Loading...</p>}
                {error && <p style={{color: 'red'}}>{error}</p>}
                {movie && !loading && (
                    <IonCard style={{ marginTop: "5rem" }} >
                        {videoList.length > 0 && videoList[currentVideoIndex] ? (
                            <>
                                {videoList[currentVideoIndex].site === "YouTube" ? (
                                    <iframe
                                        width="100%"
                                        height="450"
                                        src={`https://www.youtube.com/embed/${videoList[currentVideoIndex].key}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        title={videoList[currentVideoIndex].name}
                                        allowFullScreen
                                        style={{ borderRadius: "10px" }}
                                        onError={() => setCurrentVideoIndex((prev) => prev + 1)} // passe à la prochaine vidéo si bloquée
                                    />
                                ) : (
                                    <iframe
                                        src={`https://player.vimeo.com/video/${videoList[currentVideoIndex].key}`}
                                        width="100%"
                                        height="450"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        style={{ borderRadius: "10px" }}
                                        onError={() => setCurrentVideoIndex((prev) => prev + 1)}
                                    ></iframe>
                                )}
                                {/* Boutons Player */}
                                <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                                    {videoList.map((_, index) => (
                                        <IonButton
                                            key={index}
                                            onClick={() => setCurrentVideoIndex(index)}
                                           color="primary"
                                        >
                                            Player {index + 1}
                                        </IonButton>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <IonImg
                                src={`${imgBaseURL}/w342/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )}
                         <IonCardHeader className="ion-padding-vertical">
                            <IonCardTitle style={{marginTop: "0.5rem", fontSize: "1.8rem", fontWeight: 700}}> {movie.title}</IonCardTitle>
                             <IonGrid style={{width: '100%'}} className="ion-no-padding">
                                 <IonRow className="ion-justify-content-start ion-padding-vertical">
                                     {movie.genres && movie.genres.map((genre, index) => (
                                         <IonCol key={index} size="auto" className="ion-padding-end">
                                             <IonBadge color="tertiary">{genre.name}</IonBadge>
                                         </IonCol>
                                     ))}
                                 </IonRow>
                             </IonGrid>
                             <IonCardSubtitle color="primary">  Date de sortie: {movie.release_date}</IonCardSubtitle>
                         </IonCardHeader>
                        <IonCardContent color="primary" style={{padding:"auto"}}>
                             Synopsis: {movie.overview}
                            <IonCardSubtitle color="success" style={{paddingTop: "1rem"}}>Rating: {movie.vote_average.toFixed(0)} / 10</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
}

