// Responsible to render sign up account component
import React, { Component } from "react";
import { Field } from "redux-form";
import {
    SettingsHeading,
    ButtonOutline,
    ButtonSignUp,
    FormInput,
    ButtonPrimary,
    LoaderElement,
} from "common/components";
import SettingsSection from "./../fragments/settingsSection/SettingsSection.js";
import { minLength8, email } from "components/signup/validate";
import { buttonsConfigData } from "../buttonsConfigData.js";

// Import types of account
import type { AccountComponentPropsType } from "./AccountComponentTypes.js";

// Import styles
import "../../../assets/scss/global.scss";
import styles from "./../settings.module.scss";

import { withTranslation } from "react-i18next";

class AccountComponent extends Component<AccountComponentPropsType, AccountComponentStateType> {
    constructor(props) {
        super(props);
        this.state = {
            saved: true
        }
    }
    componentWillMount() {
        this.setState({ saved: false })
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.loading == true) {
            this.setState({ saved: true })
        }
    }
    render() {
        const { handleSubmit, handleFormSubmit, loading, subscriptionType, history, activeSite, saveSettings, t } = this.props;
        const isPremium = subscriptionType === "premium";
        return (
            <React.Fragment>
                <>
                    <SettingsSection>
                        <SettingsHeading title={t("Your Plan")} />
                        <div className={`${styles["settings-list"]} bg-white `}>
                            <div className={`${styles["settings-option"]} ${styles["with-button"]}  d-flex justify-content-between align-items-center `}>
                                <div className={styles["option-left"]}>
                                    <p className={styles["option-title"]}>{`${subscriptionType[0].toUpperCase()}${subscriptionType.slice(1)} `}{t('Membership')}</p>
                                </div>
                                <div className={`${styles["option-right"]} d-flex `}>
                                    {!isPremium &&
                                        <div className={styles["settings-container"]}>
                                            <ButtonOutline
                                                buttonSize="medium"
                                                buttonText={t("Upgrade to Premium")}
                                                action={() => history.push("/payment-braintree")}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </SettingsSection>
                    <SettingsSection>
                        <SettingsHeading title={t("Details")} />
                        <div className={`${styles["settings-list"]}  bg-white `}>
                            <div className={`${styles["settings-option"]} d-flex justify-content-between align-items-center`}>
                                <div className={`${styles["row-with-inputs"]}  row `}>
                                    <div className={` col-sm-6 ${styles["col-with-input"]}`}>
                                        <label>{$("Name")}</label>
                                        <Field
                                            component={FormInput}
                                            type="text"
                                            id="acc_det_name"
                                            name="acc_det_name"
                                            placeholder={t("Name")}
                                        />
                                    </div>
                                    <div className={` col-sm-6  ${styles["col-with-input"]}`}>
                                        <label>{t("Email Address")}</label>
                                        <Field
                                            component={FormInput}
                                            type="email"
                                            id="acc_det_email"
                                            name="acc_det_email"
                                            placeholder={t("Email")}
                                            validate={email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SettingsSection>
                    <SettingsSection>
                        <SettingsHeading title={t("Connected Accounts")} />
                        <div className={`${styles["settings-list"]} ${styles["account-list"]} bg-white `}>
                            <div className={`${styles["settings-option"]} ${styles["with-button"]}  d-flex justify-content-between align-items-center`}>
                                <div className={styles["option-left"]}>
                                    <p className={styles["option-title"]}>{t("Google")}</p>
                                    <p className={styles["option-description"]}>{t("Details about loging in using Google.")}</p>
                                </div>
                                <div className={`${styles["option-right"]}  d-flex `}>
                                    <ButtonSignUp {...buttonsConfigData[0]} />
                                </div>
                            </div>
                            <div className={`${styles["settings-option"]} ${styles["with-button"]}  d-flex justify-content-between align-items-center`}>
                                <div className={styles["option-left"]}>
                                    <p className={styles["option-title"]}>{t("Microsoft")}</p>
                                    <p className={styles["option-description"]}>{t("Details about loging in using Microsoft")}</p>
                                </div>
                                <div className={`${styles["option-right"]} d-flex `}>
                                    <ButtonSignUp {...buttonsConfigData[1]} />
                                </div>
                            </div>
                            <div className={`${styles["settings-option"]} ${styles["with-button"]}  d-flex justify-content-between align-items-center `}>
                                <div className={styles["option-left"]}>
                                    <p className={styles["option-title"]}>{t("Github")}</p>
                                    <p className={styles["option-description"]}>{t("Details about loging in using Github")}</p>
                                </div>
                                <div className={`${styles["option-right"]}  d-flex `}>
                                    <ButtonSignUp {...buttonsConfigData[2]} />
                                </div>
                            </div>
                        </div>
                    </SettingsSection>
                    <SettingsSection>
                        <SettingsHeading title={t("Reset Password")} />
                        <div className={`${styles["settings-block"]}  bg-white `}>
                            <div className={`${styles["row-with-inputs"]}  row section-block section-content `}>
                                <div className={` col-sm-6  ${styles["col-with-input"]}`}>
                                    <label>{t("Old Password")}</label>
                                    <Field
                                        component={FormInput}
                                        type="password"
                                        id="acc_pass_old"
                                        name="acc_pass_old"
                                        placeholder={t("Old Password")}
                                        validate={minLength8}
                                    />
                                </div>
                            </div>
                            <div className={`${styles["row-with-inputs"]} row  section-block section-content `}>
                                <div className={` col-sm-6  ${styles["col-with-input"]}`}>
                                    <label>{t("New Password")}</label>
                                    <Field
                                        component={FormInput}
                                        type="password"
                                        id="acc_pass_new"
                                        name="acc_pass_new"
                                        placeholder={t("New Password")}
                                        validate={minLength8}
                                    />
                                </div>
                                <div className={` col-sm-6  ${styles["col-with-input"]}`}>
                                    <label>{t("Confirm Password")}</label>
                                    <Field
                                        component={FormInput}
                                        type="password"
                                        id="acc_pass_conf"
                                        name="acc_pass_conf"
                                        placeholder={t("Confirm Password")}
                                        validate={minLength8}
                                    />
                                </div>
                            </div>
                        </div>
                    </SettingsSection>
                    <div className={styles["settings-action"]}>
                        <div className={styles["settings-container"]}>
                            <ButtonPrimary
                                buttonSize="small"
                                buttonText={saveSettings.loading == true ? t("Saving...") : saveSettings.message !== "" && this.state.saved == true ? t("Saved!") : t("Save Changes")}
                                action={handleSubmit(handleFormSubmit, activeSite)}
                                disabled={saveSettings.loading}
                            />
                        </div>
                    </div>
                </>
            </React.Fragment>
        );
    }
}

export default withTranslation()(AccountComponent)
