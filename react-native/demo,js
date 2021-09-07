import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { Colors, Images } from "App/Theme";
import TextBox from "App/Components/Design/TextInput";
import { Toast, _t } from "App/Utils";
import { Icon } from "native-base";
import RNPickerSelect from "react-native-picker-select";
import CustomDatePicker from "App/Components/datePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import userInsuranceInfoAction from "App/Stores/Insurance/userInsuranceInfo/Actions";
import editPurchaseInsuranceAction from "App/Stores/Insurance/editInsurance/Actions";
import Loader from "App/Components/Loader";
import Layout from "App/Components/Layout";

import {NavigatorContext} from 'App/Utils/NavigatorProvider'

const { width } = Dimensions.get("window");
function InsurancePurchaseForm(props) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [datePick, setDatePick] = useState(false);
  const [minimumDate, setMinimumDate] = useState("");
  const [maximumDate, setMaximumDate] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentSelectDate, setcurrentSelectDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addInsuranceLoading, setAddInsuranceLoading] = useState(false);
  const [editInsuranceLoading, setEditInsuranceLoading] = useState(false);
  const [datePickerTitle, setDatePickerTitle] = useState("");

  const userInsuranceInfo = useSelector((state) => state.userInsuranceInfo);
  const editInsurance = useSelector((state) => state.editInsurance);

  const {showErrorToast} = useContext(NavigatorContext)

  useEffect(() => {
    if (addInsuranceLoading) {
      if (!userInsuranceInfo.userInsuranceInfoIsLoading && userInsuranceInfo.userInsuranceInfoErrorMessage === null) {
        Toast.show(_t("insurance.add-insurance-success-message"), "success");
        props.navigation.navigate("InsuranceList");
        setIsLoading(false);
        setAddInsuranceLoading(false);
      }
      if (!userInsuranceInfo.userInsuranceInfoIsLoading && userInsuranceInfo.userInsuranceInfoErrorMessage !== null) {
        showErrorToast("insuranceUserInfo");
        setIsLoading(false);
        setAddInsuranceLoading(false);
      }
    }
  }, [userInsuranceInfo]);

  useEffect(() => {
    if (editInsuranceLoading) {
      if (!editInsurance.editPurchasedInsuranceIsLoading && editInsurance.editPurchasedInsuranceErrorMessage === null) {
        Toast.show(_t("insurance.update-insurance-success-message"), "success");
        props.navigation.navigate("InsuranceList");
        setIsLoading(false);
        setEditInsuranceLoading(false);
      }
      if (!editInsurance.editPurchasedInsuranceIsLoading && editInsurance.editPurchasedInsuranceErrorMessage !== null) {
        showErrorToast("updateInsuranceError");
        setIsLoading(false);
        setEditInsuranceLoading(false);
      }
    }
  }, [editInsurance]);

  useEffect(() => {
    if (props.consentAggry) {
      setFormData();
    }
  }, [props.consentAggry]);

  useEffect(() => {
    if (props.type === "editInsurance" && props.currentProduct.hasOwnProperty("policy_number")) {
      setPolicyNumber(props.currentProduct.policy_number === null ? "" : props.currentProduct.policy_number);
      
      let startDate = props?.currentProduct?.policy_purchase_date ?? "";
      setStartDate(startDate !== "" ? new Date(startDate * 1000) : "" );
      let endDate = props?.currentProduct?.policy_expiry_date ?? "";
      setEndDate(endDate !== "" ? new Date(endDate * 1000) : "" );
      setRole(props.currentProduct.policy_type === null ? "" : props.currentProduct.policy_type);
      setUserName(props.currentProduct.policy_owner === null ? "" : props.currentProduct.policy_owner);
    }
  }, [props.currentProduct]);


  function onPressSelectDate(date) {
    setcurrentSelectDate(date);
    if (date === "startDate") {
      setDatePickerTitle(_t("Global.purchase-date"));
      if (endDate !== "") {
        let maxDate = new Date(endDate);
        maxDate.setDate(maxDate.getDate() + 1);
        setMaximumDate(maxDate);
        setMinimumDate("");
      } else {
        setMaximumDate("");
        setMinimumDate("");
      }
      if (startDate !== "") {
        setDate(startDate);
      } else {
        setDate(new Date());
        if (endDate !== "") {
          let maxDate = new Date(endDate);
          maxDate.setDate(maxDate.getDate() - 1);
          setDate(maxDate);
        }
      }
      setDatePick(true);
    }
    if (date === "endDate") {
      setDatePickerTitle(_t("Global.expire-date"));

      if (startDate === "") {
        setMinimumDate("");
      } else {
        let minDate = new Date(startDate);
        minDate.setDate(minDate.getDate() + 1);
        setMinimumDate(minDate);
        setDate(minDate);
        setMaximumDate("");
      }
      if (endDate !== "") {
        setDate(endDate);
      } else {
        setDate(new Date());
        if (startDate !== "") {
          let currDate = new Date(startDate);
          currDate.setDate(currDate.getDate() + 1);
          setDate(currDate);
        }
      }
      setDatePick(true);
    }
  }

  function hideDatePicker() {
    setDatePick(false);
  }

  function hideDatePicker() {
    setDatePick(false);
  }

  function handleConfirm(date) {
    if (currentSelectDate === "startDate") {
      setStartDate(date);
      setDate(date);
      setDatePick(false);
      setMaximumDate("");
      var minDate = new Date(date);
      minDate.setDate(minDate.getDate() + 1);
      setMinimumDate(minDate);
      setDatePickerTitle(_t("Global.expire-date"));
      setcurrentSelectDate("endDate");
    }
    if (currentSelectDate === "endDate") {
      setEndDate(date);
      setDatePick(false);
    }
  }

  const onPressClear = (type) => {
    if(type === 'startDate') {
      setStartDate('');
      setMinimumDate("");
    } else {
      setEndDate('');
      setMaximumDate('')
    }
  }

  function setFormData() {
    var fromDate = new Date(startDate);
    var startUnixTimeStamp = Math.floor(fromDate.getTime() / 1000);

    var toDate = new Date(endDate);
    var endUnixTimeStamp = Math.floor(toDate.getTime() / 1000);

    let finalObj = {
      insurance_company: props.currentProduct.companyDetail,
      product: props.currentProduct.product,
      policy_number: policyNumber,
      policy_purchase_date: startUnixTimeStamp,
      policy_expiry_date: endUnixTimeStamp,
      policy_type: role,
      policy_owner: userName,
    };
    setIsLoading(true);
    setAddInsuranceLoading(true);
    dispatch(userInsuranceInfoAction.userInsuranceInfo(finalObj));
  }

  function updateInsurance() {

    var fromDate = new Date(startDate);
    var startUnixTimeStamp = Math.floor(fromDate.getTime() / 1000);

    var toDate = new Date(endDate);
    var endUnixTimeStamp = Math.floor(toDate.getTime() / 1000);

    let finalObj = {
      insurance_company: props.currentProduct.insurance_company,
      product: props.currentProduct.product,
      policy_number: policyNumber,
      policy_purchase_date: startUnixTimeStamp,
      policy_expiry_date: endUnixTimeStamp,
      policy_type: role,
      policy_owner: userName,
      _id: props.currentProduct._id,
    };
    setIsLoading(true);
    setEditInsuranceLoading(true);
    dispatch(editPurchaseInsuranceAction.editPurchasedInsurance(finalObj));
  }

  function submitForm(params) {
    if (props.type === "editInsurance") {
      updateInsurance();
    } else {
      props.openConcent();
    }
  }

  const insuranceTypeArray = [
    { label: _t("insurance.insurance-purchase-shortTerm"), value: "short term" },
    { label: _t("insurance.insurance-purchase-annual"), value: "Annual" },
  ];

  return (
    <Modal
      isVisible={props.isVisible}
      onRequestClose={() => {
        isLoading ? "" : props.onRequestClose();
      }}
      backdropOpacity={0.8}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ justifyContent: "center", margin: 0 }}
    >
      <CustomDatePicker
        title={datePickerTitle}
        {...props}
        mode="date"
        isVisable={datePick}
        onConfirm={(date) => handleConfirm(date)}
        onCancel={() => hideDatePicker()}
        minimumDate={minimumDate}
        startDate={startDate}
        endDate={endDate}
        date={date}
        maximumDate={maximumDate}
      />
      <Layout
        isPageLoad={false}
        headerTitle={_t("insurance.insurance-form-title")}
        {...props}
        isBack={true}
        isBack={"closeModal"}
        closeModal={() => (isLoading ? "" : props.onRequestClose())}
      >
        <View style={{ flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <ImageBackground source={Images.map} style={[styles.bannerImg, { width: "100%", flex: 1 }]} imageStyle={{ opacity: 0.4 }}>
            <ScrollView>
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>{_t("insurance.fill-form-text")}</Text>
                <View style={styles.insuranceForm}>
                  <TextBox
                    isExtraProps={true}
                    placeholder={_t("insurance.insurance-purchase-userName")}
                    value={userName}
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    onChangeText={(userName) => setUserName(userName)}
                  />
                  <TextBox
                    isExtraProps={true}
                    placeholder={_t("insurance.insurance-purchase-policyNumber")}
                    value={policyNumber}
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    onChangeText={(policyNumber) => setPolicyNumber(policyNumber)}
                  />

                    <View style={{flexDirection: startDate !== "" ? 'row-reverse' : 'column'}}>
                      {startDate !== "" && (
                         <TouchableOpacity onPress={() => onPressClear("startDate")}>
                         <View style={{  alignItems:'center', height: 30, width: 40, top: 22.9, borderBottomWidth: 0.8, borderBottomColor: 'rgba(0,0,0,0.6)' }}>
                          <Icon type="MaterialIcons" style={{color: Colors.orange}}  name="close" />
                         </View>
                         </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={() => onPressSelectDate("startDate")}>
                          <TextBox
                            isExtraProps={true}
                            editable={false}
                            placeholder={_t("insurance.insurance-purchase-purchaseDate")}
                            value={startDate !== "" ? moment(startDate).format("MMMM Do YYYY") : ""}
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            containerStyle={{width: startDate !== "" ?  width-80 : width-40}}
                          />
                      </TouchableOpacity>
                    
                    </View>


                    <View style={{flexDirection: endDate !== "" ? 'row-reverse' : 'column'}}>
                      {endDate !== "" && (
                         <TouchableOpacity onPress={() => onPressClear("endDate")}>
                         <View style={{  alignItems:'center', height: 30, width: 40, top: 22.9, borderBottomWidth: 0.8, borderBottomColor: 'rgba(0,0,0,0.6)' }}>
                          <Icon type="MaterialIcons" style={{color: Colors.orange}}  name="close" />
                         </View>
                         </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={() => onPressSelectDate("endDate")}>
                          <TextBox
                            isExtraProps={true}
                            editable={false}
                            placeholder={_t("insurance.insurance-purchase-expireDate")}
                            value={endDate !== "" ? moment(endDate).format("MMMM Do YYYY") : ""}
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            containerStyle={{width: endDate !== "" ?  width-80 : width-40}}
                          />
                      </TouchableOpacity>
                    
                    </View>

                  <View style={styles.pickerSelectWrap}>
                    <RNPickerSelect
                      items={insuranceTypeArray}
                      onValueChange={(value) => setRole(value)}
                      style={{
                        ...styles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                        fontSize: 20,
                      }}
                      value={role}
                      placeholder={{ label: _t("insurance.Insurance type"), value: "" }}
                      useNativeAndroidPickerStyle={false}
                      textInputProps={{ underlineColor: "yellow" }}
                      Icon={() => {
                        return <Icon name="angle-down" type="FontAwesome" style={{ fontSize: 24, color: "#999" }} />;
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
              <TouchableOpacity disabled={isLoading} style={styles.button} onPress={() => props.onRequestClose()}>
                <Text style={{ fontWeight: "bold", fontSize: 20, color: "#333" }}>{_t("insurance.cancel-text")}</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={isLoading} style={[styles.button, { backgroundColor: Colors.orange }]} onPress={() => submitForm()}>
                <View>
                  {isLoading ? (
                    <Loader size={22} color={"#ffffff"} />
                  ) : (
                      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>{_t("insurance.submit-text")}</Text>
                    )}
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Layout>
    </Modal>
  );
}

export default InsurancePurchaseForm;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: width / 2,
    height: 60,
  },
  bannerImg: {
    width: "100%",
  },
  pickerselect: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 5,
  },
  inputs: {
    color: Colors.white,
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#999',
        paddingBottom: 5,
        marginBottom: 20
      }
    }),
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
