import Contactus from "../pages/Contact/Contactus";
import ServiceCollections from "../pages/Contact/component/ServiceCollection";
import SupportPage from "../pages/Contact/component/SupportPage";
import Account from "../pages/account/Account";
import TeamIncome from "../pages/account/TeamIncome";
import Activity from "../pages/activity/Activity";
import RiskDisclosureAgreement from "../pages/auth/Component/RiskDisclosureAgreement";
import BankDetails from "../pages/bank/BankDetails";
import Banks from "../pages/bank/Banks";
import ComingSoon from "../pages/comingsoon/ComingSoon";
import Soon from "../pages/comingsoon/Soon";
import FundMain from "../pages/fund/FundMain";
import FundRecieve from "../pages/fund/FundRecive";
import FundReport from "../pages/fund/FundReport";
import FundTransfer from "../pages/fund/FundTransfer";
import P2Pmoney from "../pages/fund/P2Pmoney";
import Dashboard from "../pages/home/Dashboard";
import MainPageOFIncome from "../pages/income/MainPageOFIncome";
import DirectIncome from "../pages/income/incomeSubSection/DirectIncome";
import FundLevelCommission from "../pages/income/incomeSubSection/FundLevelCommission";
import JoiningBonus from "../pages/income/incomeSubSection/Joiningbonus";
import LevelBonus from "../pages/income/incomeSubSection/LevelBonus";
import LevelIncome from "../pages/income/incomeSubSection/LevelIncome";
import SponsorIncome from "../pages/income/incomeSubSection/SponsorIncome";
import AllLevelOfTeam from "../pages/myteam/AllLevelOfTeam";
import Tables from "../pages/myteam/Tables";
import AccountPassword from "../pages/password/AccountPassword";
import ChangePassword from "../pages/password/ChangePassword";
import TransactionPassword from "../pages/password/TransactionPassword";
import MyCommission from "../pages/promotion/MyCommission";
import Promotion from "../pages/promotion/Promotion";
import PromotionRule from "../pages/promotion/PromotionRule";
import RebateRatio from "../pages/promotion/RebateRatio";
import Server from "../pages/promotion/Server";
import Subordinates from "../pages/promotion/Subordinates";
import TeamData from "../pages/promotion/TeamData";
import TeamReport from "../pages/promotion/TeamReport";
import ViewSalaryIncome from "../pages/salaryIncome/ViewSalaryIncome";
import UPIDetails from "../pages/upi/UPIDetails";
import AddBankAccount from "../pages/wallet/Component/AddBankAccount";
import Bankaccount from "../pages/wallet/Component/Bankaccount";
import Deposite from "../pages/wallet/Component/Deposite";
import Depositehistory from "../pages/wallet/Component/Depositehistory";
import P2PTransfer from "../pages/wallet/Component/P2PTransfer";
import WithdrawalAccount from "../pages/wallet/Component/WithdrawalAccount";
import Withdrawlhistory from "../pages/wallet/Component/Withdrawlhistory";
import Wallet from "../pages/wallet/Wallet";
import Wingo from "../pages/wingo/Wingo";


export const routes = [
    {
        path: "/RiskDisclosureAgreement",
        element: <RiskDisclosureAgreement />
    },
    {
        path: "/supportPage",
        element: <SupportPage />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/withdrawlhistory",
        element: <Withdrawlhistory />
    },
    {
        path: "/depositehistory",
        element: <Depositehistory />
    },
    {
        path: "/promotion",
        element: <Promotion />
    },
    {
        path: "/wallet",
        element: <Wallet />
    },
    {
        path: "/bankcard",
        element: <Bankaccount />
    },
    {
        path: "/addbankaccount",
        element: <AddBankAccount />
    },
    {
        path: "/account",
        element: <Account />
    },
    {
        path: "/activity",
        element: <Activity />
    },
    {
        path: "/wingo",
        element: <Wingo />
    },
    {
        path: "/CustomerService",
        element: <Contactus />
    },
    {
        path: "/ServiceCollections",
        element: <ServiceCollections />
    },
    {
        path: "/comingsoon",
        element: <ComingSoon />
    },
    {
        path: "/comingsoonavaitor",
        element: <Soon />
    },
    {
        path: "/withdraw",
        element: <WithdrawalAccount />
    },
    {
        path: "/p2p",
        element: <P2PTransfer />
    },

    {
        path: "/deposit",
        element: <Deposite />
    },
    {
        path: "/bank",
        element: <BankDetails />
    },
    {
        path: "/banks-details",
        element: <Banks />
    },
    {
        path: "/banks-upi",
        element: <UPIDetails />
    },
    {
        path: "/fund-main",
        element: <FundMain />
    },
    {
        path: "/addmoneyp2p",
        element: <P2Pmoney />
    },
    {
        path: "/fund-report",
        element: <FundReport />
    },
    {
        path: "/fund-transfer",
        element: <FundTransfer />
    },
    {
        path: "/fund-recieve",
        element: <FundRecieve />
    },
    {
        path: "/view-salary-income",
        element: <ViewSalaryIncome />
    },

    {
        path: "/account/income-main",
        element: <MainPageOFIncome />
    },
    {
        path: "/account/income-main/direct-income",
        element: <DirectIncome />
    },
    {
        path: "/account/income-main/level-income",
        element: <LevelIncome />
    },
    {
        path: "/account/income-main/fund-level",
        element: <FundLevelCommission />
    },
    {
        path: "/account/income-main/level-bonus",
        element: <LevelBonus />
    },
    {
        path: "/account/income-main/sponsor",
        element: <SponsorIncome />
    },
    {
        path: "/account/income-main/joining",
        element: <JoiningBonus />
    },
    {
        path: "/account/income-main/my-team",
        element: <AllLevelOfTeam />
    },
    {
        path: "/account/income-main/my-team/levels",
        element: <Tables />
    },
    {
        path: "/account/Teamincome",
        element: <TeamIncome />
    },
    {
        path: "/promotion/TeamReport",
        element: <TeamReport />
    },
    {
        path: "/promotion/Teamdata",
        element: <TeamData />
    },
    {
        path: "/promotion/MyCommission",
        element: <MyCommission />
    },
    {
        path: "/promotion/Subordinates",
        element: <Subordinates />
    },
    {
        path: "/promotion/Server",
        element: <Server />
    },
    {
        path: "/promotion/Rebate",
        element: <RebateRatio />
    },
    {
        path: "/promotion/PromotionRule",
        element: <PromotionRule />
    },
    {
        path: "password",
        element: <ChangePassword />
    },
    {
        path: "/password/account",
        element: <AccountPassword />
    },
    {
        path: "/password/transction",
        element: <TransactionPassword />
    },
    {
        path: "/password/account",
        element: <AccountPassword />
    },

]