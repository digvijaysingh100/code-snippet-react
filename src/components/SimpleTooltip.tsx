import React, { type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import useViewport from "../hooks/use-viewport";
import { userActions } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { type simpleTooltipConfig } from "../types/tooltipTypes";

const SimpleTooltip = ({
    content,
    tabIndex,
    icon,
    placement,
    active,
    isLogoutLink,
    to,
}: simpleTooltipConfig): ReactElement => {
    const width = useViewport();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = (): void => {
        dispatch(userActions.userLoggedIn(false));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    const {
        // getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        placement: placement !== undefined ? placement : "top",
        trigger: ["click", "hover"],
        defaultVisible: false,
    });

    return (
        <>
            {isLogoutLink ?? false ? (
                <Link
                    onClick={logoutHandler}
                    className={`sm:mb-4 w-1/3 sm:w-auto sm:border border-transparent sm:hover:border-fieldOutline rounded-lg flex flex-wrap items-center justify-center ${
                        active ?? false ? "active" : ""
                    }`}
                    to={""}
                >
                    <span className="w-10 h-10 flex-wrap items-center justify-center flex relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.4443 1.68433C6.08879 0.585513 8.02219 -0.000976562 10 -0.000976562C12.6522 -0.000976562 15.1957 1.05259 17.0711 2.92796C18.9464 4.80332 20 7.34686 20 9.99902C20 11.9768 19.4135 13.9102 18.3147 15.5547C17.2159 17.1992 15.6541 18.4809 13.8268 19.2378C11.9996 19.9947 9.98891 20.1927 8.0491 19.8069C6.10929 19.421 4.32746 18.4686 2.92894 17.0701C1.53041 15.6716 0.578004 13.8897 0.192152 11.9499C-0.193701 10.0101 0.00433285 7.99945 0.761209 6.17219C1.51809 4.34493 2.79981 2.78314 4.4443 1.68433ZM9.99935 10.3357C11.8403 10.3357 13.3327 8.84331 13.3327 7.00236C13.3327 5.16141 11.8403 3.66902 9.99935 3.66902C8.15841 3.66902 6.66602 5.16141 6.66602 7.00236C6.66602 8.84331 8.15841 10.3357 9.99935 10.3357ZM10.0009 11.9766C8.96253 11.9806 7.94635 12.2775 7.06921 12.8333C6.19208 13.389 5.4896 14.1811 5.04257 15.1183C5.00826 15.1794 4.99024 15.2483 4.99024 15.3183C4.99024 15.3884 5.00826 15.4572 5.04257 15.5183C5.08022 15.577 5.13199 15.6253 5.19314 15.6588C5.25428 15.6923 5.32286 15.7099 5.39257 15.71H14.5592C14.629 15.7099 14.6975 15.6923 14.7587 15.6588C14.8198 15.6253 14.8716 15.577 14.9092 15.5183C14.9436 15.4572 14.9616 15.3884 14.9616 15.3183C14.9616 15.2483 14.9436 15.1794 14.9092 15.1183C14.4659 14.1887 13.7712 13.4017 12.9038 12.8465C12.0363 12.2912 11.0308 11.9899 10.0009 11.9766Z"
                                fill="#044FF5"
                            />
                        </svg>
                    </span>
                </Link>
            ) : (
                <Link
                    to={""}
                    ref={setTriggerRef}
                    className={`sm:mb-4 w-1/3 sm:w-auto sm:border border-transparent sm:hover:border-fieldOutline rounded-lg flex flex-wrap items-center justify-center ${
                        active ?? false ? "active" : ""
                    }`}
                >
                    <span className="w-10 h-10 flex-wrap items-center justify-center flex relative">
                        {icon === "projects" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M7.91797 0.416016H1.2513C0.791065 0.416016 0.417969 0.789112 0.417969 1.24935V7.91601C0.417969 8.37625 0.791065 8.74935 1.2513 8.74935H7.91797C8.3782 8.74935 8.7513 8.37625 8.7513 7.91601V1.24935C8.7513 0.789112 8.3782 0.416016 7.91797 0.416016Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M5.35913 10.8327C5.26915 10.7121 5.15223 10.614 5.01768 10.5465C4.88313 10.479 4.73467 10.4438 4.58413 10.4438C4.43359 10.4438 4.28513 10.479 4.15058 10.5465C4.01603 10.614 3.8991 10.7121 3.80913 10.8327L1.17579 14.4411C1.05412 14.6018 0.988281 14.7978 0.988281 14.9994C0.988281 15.201 1.05412 15.397 1.17579 15.5577L3.80913 19.1661C3.8991 19.2868 4.01603 19.3848 4.15058 19.4523C4.28513 19.5198 4.43359 19.555 4.58413 19.555C4.73467 19.555 4.88313 19.5198 5.01768 19.4523C5.15223 19.3848 5.26915 19.2868 5.35913 19.1661L7.99246 15.5327C8.11413 15.372 8.17997 15.176 8.17997 14.9744C8.17997 14.7728 8.11413 14.5768 7.99246 14.4161L5.35913 10.8327Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M15.4167 8.74935C17.7179 8.74935 19.5833 6.88387 19.5833 4.58268C19.5833 2.2815 17.7179 0.416016 15.4167 0.416016C13.1155 0.416016 11.25 2.2815 11.25 4.58268C11.25 6.88387 13.1155 8.74935 15.4167 8.74935Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M14.5033 11.4071C14.4295 11.2828 14.3247 11.1797 14.199 11.1082C14.0733 11.0366 13.9312 10.999 13.7866 10.999C13.642 10.999 13.4999 11.0366 13.3743 11.1082C13.2486 11.1797 13.1438 11.2828 13.07 11.4071L9.11165 18.0738C9.03851 18.2005 9 18.3442 9 18.4904C9 18.6367 9.03851 18.7804 9.11165 18.9071C9.18507 19.0343 9.29079 19.1398 9.4181 19.213C9.54542 19.2861 9.6898 19.3244 9.83665 19.3238H17.7533C17.9002 19.3244 18.0445 19.2861 18.1719 19.213C18.2992 19.1398 18.4049 19.0343 18.4783 18.9071C18.5515 18.7804 18.59 18.6367 18.59 18.4904C18.59 18.3442 18.5515 18.2005 18.4783 18.0738L14.5033 11.4071Z"
                                    fill="#044FF5"
                                />
                            </svg>
                        ) : icon === "team" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M3.33413 9.16608C3.73864 9.16773 4.13452 9.04918 4.47155 8.82547C4.80857 8.60177 5.07155 8.28299 5.22711 7.90958C5.38267 7.53618 5.4238 7.12498 5.34529 6.72816C5.26678 6.33134 5.07216 5.96679 4.78612 5.68076C4.50009 5.39472 4.13554 5.2001 3.73872 5.12159C3.3419 5.04308 2.9307 5.08421 2.5573 5.23977C2.18389 5.39533 1.86511 5.65831 1.64141 5.99533C1.4177 6.33236 1.29915 6.72824 1.3008 7.13275C1.3008 7.67202 1.51502 8.18921 1.89635 8.57053C2.27767 8.95185 2.79486 9.16608 3.33413 9.16608Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M3.33333 9.58276C2.44928 9.58276 1.60143 9.93395 0.976311 10.5591C0.351189 11.1842 0 12.032 0 12.9161L0 14.7244C0.00159366 14.7763 0.0134637 14.8273 0.0349214 14.8745C0.0563792 14.9217 0.0869975 14.9641 0.125 14.9994C0.162205 15.0395 0.207375 15.0713 0.257607 15.0928C0.307839 15.1143 0.36202 15.1251 0.416667 15.1244H1.11667C1.22086 15.122 1.32205 15.1594 1.39951 15.2291C1.47698 15.2989 1.52485 15.3956 1.53333 15.4994L1.95 19.6078C1.95839 19.7102 2.00508 19.8057 2.08077 19.8752C2.15646 19.9447 2.25557 19.9831 2.35833 19.9828H4.30833C4.41109 19.9831 4.51021 19.9447 4.58589 19.8752C4.66158 19.8057 4.70828 19.7102 4.71667 19.6078L5.13333 15.4994C5.14181 15.3956 5.18969 15.2989 5.26715 15.2291C5.34462 15.1594 5.44581 15.122 5.55 15.1244H6.25C6.35984 15.1223 6.46458 15.0777 6.54227 15C6.61995 14.9223 6.66453 14.8176 6.66667 14.7078V12.9161C6.66667 12.032 6.31548 11.1842 5.69036 10.5591C5.06523 9.93395 4.21739 9.58276 3.33333 9.58276Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M16.6662 9.16608C17.0707 9.16773 17.4666 9.04918 17.8036 8.82547C18.1406 8.60177 18.4036 8.28299 18.5591 7.90958C18.7147 7.53618 18.7558 7.12498 18.6773 6.72816C18.5988 6.33134 18.4042 5.96679 18.1182 5.68076C17.8321 5.39472 17.4676 5.2001 17.0707 5.12159C16.6739 5.04308 16.2627 5.08421 15.8893 5.23977C15.5159 5.39533 15.1971 5.65831 14.9734 5.99533C14.7497 6.33236 14.6312 6.72824 14.6328 7.13275C14.6328 7.39977 14.6854 7.66418 14.7876 7.91087C14.8898 8.15757 15.0396 8.38172 15.2284 8.57053C15.4172 8.75934 15.6413 8.90912 15.888 9.0113C16.1347 9.11349 16.3991 9.16608 16.6662 9.16608Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M16.6673 9.58276C15.7833 9.58276 14.9354 9.93395 14.3103 10.5591C13.6852 11.1842 13.334 12.032 13.334 12.9161V14.7244C13.3361 14.8343 13.3807 14.939 13.4584 15.0167C13.5361 15.0944 13.6408 15.139 13.7507 15.1411H14.4507C14.5548 15.1386 14.656 15.1761 14.7335 15.2458C14.811 15.3155 14.8588 15.4122 14.8673 15.5161L15.284 19.6244C15.2924 19.7268 15.3391 19.8223 15.4148 19.8919C15.4904 19.9614 15.5896 19.9998 15.6923 19.9994H17.6423C17.7451 19.9998 17.8442 19.9614 17.9199 19.8919C17.9956 19.8223 18.0423 19.7268 18.0507 19.6244L18.4673 15.5161C18.4758 15.4122 18.5237 15.3155 18.6011 15.2458C18.6786 15.1761 18.7798 15.1386 18.884 15.1411H19.584C19.6938 15.139 19.7986 15.0944 19.8763 15.0167C19.9539 14.939 19.9985 14.8343 20.0007 14.7244V12.9161C20.0007 12.032 19.6495 11.1842 19.0243 10.5591C18.3992 9.93395 17.5514 9.58276 16.6673 9.58276Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M8.24219 1.8903C8.24219 2.21993 8.33994 2.54217 8.52307 2.81625C8.70621 3.09033 8.9665 3.30395 9.27105 3.4301C9.57559 3.55624 9.9107 3.58925 10.234 3.52494C10.5573 3.46063 10.8543 3.3019 11.0874 3.06881C11.3205 2.83572 11.4792 2.53875 11.5435 2.21545C11.6078 1.89215 11.5748 1.55704 11.4487 1.25249C11.3225 0.94795 11.1089 0.687653 10.8348 0.504517C10.5607 0.321381 10.2385 0.223633 9.90885 0.223633C9.46683 0.223633 9.0429 0.399227 8.73034 0.711788C8.41778 1.02435 8.24219 1.44827 8.24219 1.8903Z"
                                    fill="#044FF5"
                                />
                                <path
                                    d="M9.93333 4.00006C9.61457 3.99786 9.29853 4.05874 9.0034 4.17921C8.70827 4.29967 8.43988 4.47734 8.21371 4.70196C7.98753 4.92659 7.80803 5.19374 7.68554 5.48804C7.56305 5.78233 7.49999 6.09795 7.5 6.41672V7.88339C7.50057 7.99435 7.54212 8.1012 7.61667 8.18339C7.69798 8.25936 7.8054 8.30113 7.91667 8.30006H8.33333C8.43699 8.29954 8.53711 8.33767 8.61416 8.40701C8.6912 8.47635 8.73964 8.57192 8.75 8.67506L9.08333 11.9584C9.09172 12.0608 9.13842 12.1563 9.21411 12.2258C9.28979 12.2953 9.38891 12.3337 9.49167 12.3334H10.325C10.4292 12.3359 10.5304 12.2984 10.6078 12.2287C10.6853 12.159 10.7332 12.0623 10.7417 11.9584L11.075 8.67506C11.0852 8.57334 11.1325 8.47893 11.2077 8.40979C11.283 8.34064 11.3811 8.30159 11.4833 8.30006H11.9C11.9553 8.30242 12.0106 8.29325 12.0622 8.27315C12.1138 8.25304 12.1607 8.22243 12.1999 8.18326C12.239 8.14409 12.2697 8.09721 12.2898 8.04559C12.3099 7.99397 12.319 7.93874 12.3167 7.88339V6.41672C12.3167 5.78152 12.0667 5.17183 11.6207 4.71956C11.1746 4.26729 10.5685 4.00882 9.93333 4.00006Z"
                                    fill="#044FF5"
                                />
                            </svg>
                        ) : icon === "account" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.4443 1.68433C6.08879 0.585513 8.02219 -0.000976562 10 -0.000976562C12.6522 -0.000976562 15.1957 1.05259 17.0711 2.92796C18.9464 4.80332 20 7.34686 20 9.99902C20 11.9768 19.4135 13.9102 18.3147 15.5547C17.2159 17.1992 15.6541 18.4809 13.8268 19.2378C11.9996 19.9947 9.98891 20.1927 8.0491 19.8069C6.10929 19.421 4.32746 18.4686 2.92894 17.0701C1.53041 15.6716 0.578004 13.8897 0.192152 11.9499C-0.193701 10.0101 0.00433285 7.99945 0.761209 6.17219C1.51809 4.34493 2.79981 2.78314 4.4443 1.68433ZM9.99935 10.3357C11.8403 10.3357 13.3327 8.84331 13.3327 7.00236C13.3327 5.16141 11.8403 3.66902 9.99935 3.66902C8.15841 3.66902 6.66602 5.16141 6.66602 7.00236C6.66602 8.84331 8.15841 10.3357 9.99935 10.3357ZM10.0009 11.9766C8.96253 11.9806 7.94635 12.2775 7.06921 12.8333C6.19208 13.389 5.4896 14.1811 5.04257 15.1183C5.00826 15.1794 4.99024 15.2483 4.99024 15.3183C4.99024 15.3884 5.00826 15.4572 5.04257 15.5183C5.08022 15.577 5.13199 15.6253 5.19314 15.6588C5.25428 15.6923 5.32286 15.7099 5.39257 15.71H14.5592C14.629 15.7099 14.6975 15.6923 14.7587 15.6588C14.8198 15.6253 14.8716 15.577 14.9092 15.5183C14.9436 15.4572 14.9616 15.3884 14.9616 15.3183C14.9616 15.2483 14.9436 15.1794 14.9092 15.1183C14.4659 14.1887 13.7712 13.4017 12.9038 12.8465C12.0363 12.2912 11.0308 11.9899 10.0009 11.9766Z"
                                    fill="#044FF5"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="group"
                            >
                                <path
                                    className="group-hover:fill-black"
                                    d="M7 -0.000488281C5.61553 -0.000488281 4.26216 0.410055 3.11101 1.17922C1.95987 1.94839 1.06266 3.04164 0.532846 4.32073C0.003033 5.59981 -0.13559 7.00728 0.134506 8.36514C0.404603 9.72301 1.07129 10.9703 2.05026 11.9493C3.02922 12.9282 4.2765 13.5949 5.63437 13.865C6.99224 14.1351 8.3997 13.9965 9.67879 13.4667C10.9579 12.9369 12.0511 12.0396 12.8203 10.8885C13.5895 9.73736 14 8.38398 14 6.99951C14 5.143 13.2625 3.36252 11.9498 2.04976C10.637 0.73701 8.85652 -0.000488281 7 -0.000488281V-0.000488281ZM7.14584 2.91618C7.3189 2.91618 7.48807 2.9675 7.63196 3.06364C7.77585 3.15979 7.88801 3.29644 7.95423 3.45633C8.02046 3.61622 8.03779 3.79215 8.00402 3.96188C7.97026 4.13162 7.88693 4.28753 7.76456 4.4099C7.64218 4.53227 7.48627 4.6156 7.31654 4.64937C7.14681 4.68313 6.97087 4.6658 6.81099 4.59957C6.6511 4.53335 6.51445 4.4212 6.4183 4.2773C6.32215 4.13341 6.27084 3.96424 6.27084 3.79118C6.27084 3.55911 6.36302 3.33655 6.52712 3.17246C6.69121 3.00837 6.91377 2.91618 7.14584 2.91618ZM8.45834 10.7912H6.125C5.97029 10.7912 5.82192 10.7297 5.71252 10.6203C5.60313 10.5109 5.54167 10.3626 5.54167 10.2078C5.54167 10.0531 5.60313 9.90476 5.71252 9.79537C5.82192 9.68597 5.97029 9.62451 6.125 9.62451H6.5625C6.60118 9.62451 6.63827 9.60915 6.66562 9.5818C6.69297 9.55445 6.70834 9.51736 6.70834 9.47868V6.85368C6.70834 6.815 6.69297 6.77791 6.66562 6.75056C6.63827 6.72321 6.60118 6.70784 6.5625 6.70784H6.125C5.97029 6.70784 5.82192 6.64639 5.71252 6.53699C5.60313 6.42759 5.54167 6.27922 5.54167 6.12451C5.54167 5.9698 5.60313 5.82143 5.71252 5.71203C5.82192 5.60264 5.97029 5.54118 6.125 5.54118H6.70834C7.01776 5.54118 7.3145 5.66409 7.53329 5.88289C7.75209 6.10168 7.875 6.39843 7.875 6.70784V9.47868C7.875 9.51736 7.89037 9.55445 7.91772 9.5818C7.94507 9.60915 7.98216 9.62451 8.02084 9.62451H8.45834C8.61305 9.62451 8.76142 9.68597 8.87082 9.79537C8.98021 9.90476 9.04167 10.0531 9.04167 10.2078C9.04167 10.3626 8.98021 10.5109 8.87082 10.6203C8.76142 10.7297 8.61305 10.7912 8.45834 10.7912Z"
                                    fill="#BABFC9"
                                />
                            </svg>
                        )}
                        {/* {active && (
              <span className="sidebar-notifications bg-error w-1.5 h-1.5 rounded-full absolute right-1 top-1"></span>
            )} */}
                    </span>
                </Link>
            )}
            {visible && width > 640 && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({
                        className:
                            "tooltip-container !rounded-lg text-base leading-16 text-black  font-inter-regular !shadow-none !py-2 !px-3 !border-fieldOutline",
                    })}
                >
                    {content}
                    {/* <div {...getArrowProps({ className: 'tooltip-arrow' })} /> */}
                </div>
            )}
        </>
    );
};

export default SimpleTooltip;
