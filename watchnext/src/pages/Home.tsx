import {
    IonFooter,
    IonHeader,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton, IonContent, IonImg, IonRouterLink
} from '@ionic/react';
import './Home.css';
import {helpCircle, home, personCircle, search} from "ionicons/icons";

const Home: React.FC = () => {
return (
    <IonPage>
        <IonContent fullscreen className="home-content">
            <div className="home-container">
                <IonImg src="movie.jpg"
                        alt="Movies"
                        className="home-image"/>
                <div className="home-card">
                    <h1> Welcome to WatchNext</h1>
                    <h6>Your app to upcoming movies & series </h6>
                    <IonRouterLink href="/comingsoon">
                        <IonButton expand={"block"} color={"tertiary"} shape={"round"} size={"large"}>Get
                            Started</IonButton>
                    </IonRouterLink>
                </div>
            </div>
        </IonContent>
    </IonPage>

    );

};
export default Home;
