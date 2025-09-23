import {
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonPage, IonRow,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";

export default function Detail() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Description</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <IonImg
                    src="https://docs-demo.ionic.io/assets/madison.jpg"
                    alt="The Wisconsin State Capitol building in Madison, WI at night"
                    style={{width: "100%", height: "auto", margin: "0 auto"}}

                />

                <IonGrid>
                    <IonRow>
                        <IonCol>Movie Title: </IonCol>
                        <IonCol>Rating:</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Movie Description:</IonCol>
                    </IonRow>
                </IonGrid>


            </IonContent>
        </IonPage>
    )
}