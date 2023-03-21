import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TripListItem extends LitElement {

  static get properties() {
    return {
      trip: { type: Object },
    };
  };

  render() {
    const trip = this.trip;
    return html`
    <link rel="stylesheet" src="css/main.diary.css">
    <div ng-class="{'enhanced-trip-item': configTripNotes}">
    <!-- New Trip Template format  -->

        <ion-item class="unified-diary-item" style="background-color: transparent;" class="list-item">

            <!-- Start Time Tag -->
            <div class="start-time-tag">${trip?.display_start_time}</div>

            <div class="diary-card">
                <!-- Leaflet Map -->
                <div id="left-diary-card" class="diary-map-shell" ng-click="showDetail($event, trip)">
                    <!-- <leaflet class="diary-map" geojson="trip" defaults="mapCtrl.defaults"
                        id="$index" data-tap-disabled="true", height="{{mapHeight}}">
                    </leaflet> -->
                    <leaflet-map .geojson="${trip?.data}"></leaflet-map>
                    <div ng-if="configTripNotes" class="row" style="height: 20%; padding: 10px">
                        <enketo-add-note-button notes-config="configTripNotes" timeline-entry="trip"
                            datakey="manual/trip_addition_input" style="margin: auto">
                        </enketo-add-note-button>
                    </div>
                </div>
                
                <!-- Trip Information -->
                <div id="right-diary-card" style="width: 50%; float: right;">
                    <div class="diary-infos" style="padding-top: 10px; width: 100%;" ng-click="showDetail($event, trip)">
                        
                        <!-- Distance and Time -->
                        <div class="row" style="padding:4px">
                            <div class="col-90" style="font-size: 12px; text-align: center;">
                            <b><u>${trip?.display_date}</u></b>
                            </div>
                            <div class="col-10">
                                <i class="ion-ios-more" style="font-size: 30px; color:black" ng-click="showDetail($event, trip)"></i>
                            </div>
                        </div>
                        <div class="row">
                            <!-- <div class="diary-distance-time"
                                translate=".distance-in-time"
                                translate-value-distance="{{ trip.display_distance }} {{trip.display_distance_suffix }}"
                                translate-value-time="{{ trip.display_time }}">
                            </div> -->
                            <div class="diary-distance-time">
                                ${trip?.display_distance} ${trip?.display_distance_suffix} in ${trip?.display_time}
                            </div>
                        </div>

                        <!-- Modes / Percentages -->
                        <div class="diary-modes-percents" ng-if="trip.percentages">
                            <span
                                class="diary-modes-percents-text"
                                ng-if="!trip.isDraft"
                                ng-repeat="sectionPct in trip.percentages">
                                <span class="diary-modes-percents-icon {{sectionPct.icon}}"></span>
                                <span>{{sectionPct.pct}}%</span>
                            </span>
                            <button class="diary-draft-button" ng-if="trip.isDraft" ng-click="explainDraft($event)">
                                <!-- <span translate>{{'.draft'}}</span> -->
                            </button>
                        </div>

                        <!-- Locations -->
                        <div class="diary-route">

                            <!-- Row, containing Detail Screen button and Trip Origin/Destination -->
                            <div class="row" style="padding: 4px">
                                <div class="col-100" style="width: 100%; height: 70px">
                                    <!-- Origin for Trip -->
                                    <div class="diary-street two-lines" ng-click="showDetail($event, trip)">
                                        <i class="icon ion-location" style="font-size: 16px; left: 0; color: #80D0FF;"></i>
                                        ${trip?.start_display_name}
                                        </div>

                                    <!-- Destination for Trip -->
                                    <div class="diary-street two-lines" ng-click="showDetail($event, trip)">
                                        <i class="icon ion-flag" style="font-size: 16px; left: 0; color: #0088ce;"></i>
                                        ${trip?.end_display_name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="diary-infos" style="padding-top: 10px; padding-bottom: 10px; width: 100%;">
                        <!-- Mode and Purpose Selection -->
                        <div class="row" style="margin-top: 0px; padding: 4px">
                            <!-- Assumes that the trip labels have already been
                            filled in outside the directive to filter properly
                            e.g. https://github.com/e-mission/e-mission-docs/issues/674#issuecomment-933083710
                            -->
                            <div class="col-90">

                                <!-- <linkedsurvey element-tag="{{surveyOpt.elementTag}}" class="col" timeline-entry="trip"></linkedsurvey> -->
                            </div>

                            <!-- <verifycheck linkedtag="{{surveyOpt.elementTag}}" style="padding: 8px" class="col-10 diarycheckmark-container center-vert center-horiz"></verifycheck> -->
                        </div> 
                    </div>
                </div>
                <enketo-notes-list ng-if="trip.additionsList.length" timeline-entry="trip" addition-entries="trip.additionsList"></enketo-notes-list>
            </div>
            <!-- End Time Tag -->
            <div class="stop-time-tag">${trip?.display_end_time}</div>
        </ion-item>
    </div>
  `;
  }



  static styles = css`
    @import url('lib/ionic/css/ionic.css');
    @import url('css/main.diary.css');
    @import url('css/style.css');
  `;
}

customElements.define('trip-list-item', TripListItem);