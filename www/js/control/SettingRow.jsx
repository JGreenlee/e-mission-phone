import React from "react";
import { angularize } from "../angular-react-helper";
import { List, IconButton, Switch } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import { string, func, bool } from "prop-types";

const SettingRow = ({textKey, iconName, action, switchValue=null}) => {
    const { t } = useTranslation(); //this accesses the translations

    let rightComponent;
    if (switchValue) {
        rightComponent = <Switch value={switchValue} />;
    } else {
        rightComponent = <IconButton icon={iconName} onPress={(e) => action(e)} />;
    }
    
    return (
        <List.Item
        title={t(textKey)}
        onPress={() => console.log("empty")}
        right={() => rightComponent} />
    );
};
SettingRow.propTypes = {
    textKey: string,
    iconName: string,
    action: func,
    switchValue: bool,
}

angularize(SettingRow, 'emission.main.control.settingRow'); 
export default SettingRow;
