import {
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {helpCircle, home, personCircle, search} from "ionicons/icons";

const Home: React.FC = () => {
  // @ts-ignore
    return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
              <IonTitle>Search a content </IonTitle>
          </IonToolbar>
          <IonToolbar>
              <IonSearchbar color="dark"
              ></IonSearchbar>
          </IonToolbar>
      </IonHeader>
        <IonFooter>
            <IonToolbar>
                <div className="ion-align-content-around">
                    <IonButton >
                        <IonIcon slot="icon-only" icon={home}></IonIcon>
                    </IonButton>
                <IonButton >
                    <IonIcon slot="icon-only" icon={search}></IonIcon>
                </IonButton>

                <IonButton>
                    <IonIcon  slot="icon-only" icon={helpCircle}></IonIcon>
                </IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    </IonPage>
  );
};


export default Home;
