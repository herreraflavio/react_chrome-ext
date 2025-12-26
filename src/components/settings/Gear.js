import React, { useState, useEffect } from "react";
import GearIcon from "./gear.png";
import MorningIcon from "./icons/morningIcon.png";
import AfternoonIcon from "./icons/afternoonIcon.png";
import EveningIcon from "./icons/eveningIcon.png";
import NightIcon from "./icons/nightIcon.png";
import "./Gear.css";

function Gear({
  myCheckBox,
  handleCheckBox,
  transitionTimeState,
  handleTransitionTime,
}) {
  const [settings, setSettings] = useState(false);
  const toggleSettings = () => {
    setSettings(!settings);
  };

  const themeIconArray = [
    {
      row: [
        {
          id: 1,
          image: MorningIcon,
          transform: "scale(1.5)",
        },
        {
          id: 2,
          image: AfternoonIcon,
          transform: "scale(1.0)",
        },
      ],
    },
    {
      row: [
        {
          id: 3,
          image: EveningIcon,
          transform: "scale(1.5)",
        },
        {
          id: 4,
          image: NightIcon,
          transform: "scale(1.5)",
        },
      ],
    },
  ];

  const [selectedThemeIcon, setSelectedThemeIcon] = useState();

  const selectTheme = (id) => {
    if (id === selectedThemeIcon) {
      setSelectedThemeIcon(null);
      return;
    }
    setSelectedThemeIcon(id);
  };

  const renderThemeIcons = () => {
    return themeIconArray.map((row) => {
      return (
        <div className="settingsImageRow">
          {row.row.map((icon) => {
            return (
              <div
                className={`settingsImageContainer ${
                  selectedThemeIcon != null && icon.id === selectedThemeIcon
                    ? "selectedTheme"
                    : ""
                }`}
                onClick={() => selectTheme(icon.id)}
              >
                <div
                  className="settingsImage"
                  style={{
                    backgroundImage: `url(${icon.image})`,
                    transform: icon.transform,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  useEffect(() => {
    console.log("checkBox: " + myCheckBox);
  }, [myCheckBox]);

  return (
    <div className="outerDiv">
      {settings ? (
        <div className="outerSettingsDiv">
          <div className="innerSettingsDiv">
            <div className="settingsDiv">
              <div className="settingsInnerDiv">
                <div className="settingsOptionDiv">
                  <div className="settingsText">
                    Background Image transition speed
                  </div>
                  <div>
                    <input
                      type="text"
                      value={transitionTimeState}
                      onChange={(e) => handleTransitionTime(e.target.value)}
                      className="settingsInput"
                    />
                  </div>
                </div>
                <div className="settingsOptionDiv">
                  <div className="settingsText">
                    Auto background image transition
                  </div>
                  <input
                    type="checkbox"
                    id="myCheckbox"
                    checked={myCheckBox}
                    onChange={() => handleCheckBox()}
                  />
                  <label for="myCheckbox">Check this box</label>
                </div>
                <div className="settingsOptionDiv">
                  <div className="settingsText">Choose Theme</div>
                  {renderThemeIcons()}
                </div>
              </div>
            </div>
          </div>
          <div className="settingSquare"></div>
        </div>
      ) : null}

      <div className="gearContainer" onClick={toggleSettings}>
        <img src={GearIcon} alt="" className="gear" />
      </div>
    </div>
  );
}

export default Gear;
