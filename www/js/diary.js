import angular from 'angular';
import LabelTab from './diary/LabelTab';

angular.module('emission.main.diary',['emission.survey.multilabel.buttons',
                                      'emission.survey.enketo.add-note-button',
                                      'emission.survey.enketo.trip.button',
                                      'emission.plugin.logger'])

.config(function($stateProvider) {
  $stateProvider
  .state('root.main.inf_scroll', {
      url: "/inf_scroll",
      views: {
        'main-inf-scroll': {
          template: "<label-tab></label-tab>",
        },
      }
  })
});
