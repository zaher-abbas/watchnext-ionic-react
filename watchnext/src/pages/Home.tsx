import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonImg,
    IonButton, IonIcon,
} from '@ionic/react';
import React from "react";
import {play} from "ionicons/icons";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid style={{ height: '100%' }}>
                    <IonRow class="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
                        <IonCol size="12" size-md="10" size-lg="10">
                            <IonCard className="ion-text-center ion-padding">
                                <IonImg
                                    src="movie.jpg"
                                    alt="WatchNext"
                                    style={{ width: 475, height: 475, borderRadius: 12, margin: '0 auto 12px' }}
                                />
                                <IonCardHeader className="ion-margin-bottom ion-padding-bottom">
                                    <IonCardTitle style={{fontWeight: 700, fontSize: 36}} color="primary">WatchNext</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonText className="ion-padding-start ion-padding-end" color="dark" style={{ fontSize: 18, lineHeight: 1.6 }}>
                                            Discover upcoming movies and series. Track premieres, build your watchlist, and get ready for what’s
                                            next—so you never miss a story.
                                    </IonText>
                                    <IonButton className="ion-margin-top ion-padding-top" expand="block" color="tertiary" shape="round" size="large" routerLink="/comingsoon">
                                        <IonIcon slot="start" icon={play}> </IonIcon>
                                        Explore Coming Soon
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
