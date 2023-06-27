import React from "react";
import SettingRow from "./SettingRow";
import DemographicsSettingRow from "./DemographicsSettingRow";
import { object } from "prop-types";
import { angularize } from "../angular-react-helper";

const ProfileSettings = ({ settingsScope }) => {

    // settingsScope is the $scope of general-settings.js
    // grab any variables or functions you need from it like this:
    const { logOut, viewPrivacyPolicy } = settingsScope;

    return (
        <>
            {/* First 3 rows are done for you! */}
            <SettingRow textKey="settings.auth.opcode" iconName="logout" action={logOut} />
            <DemographicsSettingRow></DemographicsSettingRow>
            <SettingRow textKey="control.view-privacy" iconName="eye" action={(e) => viewPrivacyPolicy(e)} />
        </>
    );
  };
 
  ProfileSettings.propTypes = {
    settingsScope: object,
    }
   
  angularize(ProfileSettings, 'emission.main.control.profileSettings'); 
  export default ProfileSettings;
  