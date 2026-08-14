import { useRef } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";

import {
  FaGlobeAmericas,
  FaCalendarAlt,
  FaBell,
  FaDownload,
  FaUpload,
  FaTrashAlt,
  FaUndo,
} from "react-icons/fa";

import {
  exportBudgetHQ,
  importBudgetHQ,
  clearBudgetHQData,
} from "../utils/backup";

import { useSettings } from "../context/SettingsContext";

function Settings() {
  const fileInputRef = useRef(null);

  const {
    settings,
    updateSetting,
    resetSettings,
  } = useSettings();

  function handleExport() {
    exportBudgetHQ();
  }

  function handleImport(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    importBudgetHQ(file)
      .then(() => {
        alert(
          "Backup restored successfully. The page will now reload."
        );

        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });

    event.target.value = "";
  }

  function handleClearData() {
    const confirmed = window.confirm(
      "This will permanently delete all Budget HQ data from this browser. Have you made a backup first?"
    );

    if (!confirmed) return;

    clearBudgetHQData();

    alert(
      "All Budget HQ data has been cleared."
    );

    window.location.reload();
  }

  return (
    <div className="settings-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Settings</h1>

          <p>
            Make Budget HQ work exactly the way
            you like.
          </p>
        </div>

        <div className="settings-heart">
          💗
        </div>
      </div>

      {/* GENERAL SETTINGS */}

      <Paper
        elevation={0}
        className="settings-card"
      >
        <div className="settings-card-header">
          <div className="settings-section-icon">
            ⚙️
          </div>

          <div>
            <h2>General Settings</h2>

            <p>
              Personalize your Budget HQ
              experience.
            </p>
          </div>
        </div>

        <div className="settings-options">
          {/* CURRENCY */}

          <div className="settings-option">
            <div className="settings-option-info">
              <div className="settings-option-icon">
                <FaGlobeAmericas />
              </div>

              <div>
                <strong>Currency</strong>

                <span>
                  Choose how money is displayed
                </span>
              </div>
            </div>

            <FormControl
              size="small"
              className="settings-select"
            >
              <InputLabel>
                Currency
              </InputLabel>

              <Select
                value={settings.currency}
                label="Currency"
                onChange={(event) =>
                  updateSetting(
                    "currency",
                    event.target.value
                  )
                }
              >
                <MenuItem value="XCD">
                  XCD — East Caribbean Dollar
                </MenuItem>

                <MenuItem value="USD">
                  USD — US Dollar
                </MenuItem>

                <MenuItem value="GBP">
                  GBP — British Pound
                </MenuItem>

                <MenuItem value="EUR">
                  EUR — Euro
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* FIRST DAY */}

          <div className="settings-option">
            <div className="settings-option-info">
              <div className="settings-option-icon">
                <FaCalendarAlt />
              </div>

              <div>
                <strong>
                  First Day of Week
                </strong>

                <span>
                  Choose your preferred calendar
                  start
                </span>
              </div>
            </div>

            <FormControl
              size="small"
              className="settings-select"
            >
              <InputLabel>
                Week Starts
              </InputLabel>

              <Select
                value={settings.firstDayOfWeek}
                label="Week Starts"
                onChange={(event) =>
                  updateSetting(
                    "firstDayOfWeek",
                    event.target.value
                  )
                }
              >
                <MenuItem value="Monday">
                  Monday
                </MenuItem>

                <MenuItem value="Sunday">
                  Sunday
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* ALERTS */}

          <div className="settings-option">
            <div className="settings-option-info">
              <div className="settings-option-icon">
                <FaBell />
              </div>

              <div>
                <strong>
                  Budget Alerts
                </strong>

                <span>
                  Get notified when you're getting
                  close to a budget limit
                </span>
              </div>
            </div>

            <FormControlLabel
              control={
                <Switch
                  checked={
                    settings.budgetAlerts
                  }
                  onChange={(event) =>
                    updateSetting(
                      "budgetAlerts",
                      event.target.checked
                    )
                  }
                />
              }
              label={
                settings.budgetAlerts
                  ? "On"
                  : "Off"
              }
              className="settings-switch"
            />
          </div>
        </div>
      </Paper>

      {/* DATA BACKUP */}

      <Paper
        elevation={0}
        className="settings-card"
      >
        <div className="settings-card-header">
          <div className="settings-section-icon">
            💾
          </div>

          <div>
            <h2>Data Backup</h2>

            <p>
              Keep a copy of your Budget HQ data
              safe.
            </p>
          </div>
        </div>

        <div className="backup-info">
          <p>
            Export your data whenever you want a
            backup, or restore a previous backup
            file.
          </p>
        </div>

        <div className="settings-buttons">
          <Button
            variant="contained"
            startIcon={<FaDownload />}
            onClick={handleExport}
          >
            Export Backup
          </Button>

          <Button
            variant="outlined"
            startIcon={<FaUpload />}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            Import Backup
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            style={{
              display: "none",
            }}
          />
        </div>
      </Paper>

      {/* RESET SETTINGS */}

      <Paper
        elevation={0}
        className="settings-card"
      >
        <div className="settings-card-header">
          <div className="settings-section-icon">
            🔄
          </div>

          <div>
            <h2>Reset Settings</h2>

            <p>
              Restore your Budget HQ preferences
              to their defaults.
            </p>
          </div>
        </div>

        <div className="settings-danger-row">
          <div>
            <strong>
              Reset preferences
            </strong>

            <span>
              Your financial data will not be
              deleted.
            </span>
          </div>

          <Button
            variant="outlined"
            startIcon={<FaUndo />}
            onClick={resetSettings}
          >
            Reset Settings
          </Button>
        </div>
      </Paper>

      {/* DANGER ZONE */}

      <Paper
        elevation={0}
        className="settings-danger-card"
      >
        <div className="settings-card-header">
          <div className="settings-danger-icon">
            ⚠️
          </div>

          <div>
            <h2>Danger Zone</h2>

            <p>
              This action permanently removes
              your Budget HQ data from this
              browser.
            </p>
          </div>
        </div>

        <div className="settings-danger-content">
          <div>
            <strong>
              Clear all Budget HQ data
            </strong>

            <span>
              This cannot be undone. Make sure
              you have exported a backup first.
            </span>
          </div>

          <Button
            variant="outlined"
            color="error"
            startIcon={<FaTrashAlt />}
            onClick={handleClearData}
          >
            Clear All Data
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Settings;