import Contactus from "../pages/Contact/Contactus";
import ServiceCollections from "../pages/Contact/component/ServiceCollection";
import SupportPage from "../pages/Contact/component/SupportPage";
import Account from "../pages/account/Account";
import RiskDisclosureAgreement from "../pages/auth/Component/RiskDisclosureAgreement";
import ComingSoon from "../pages/comingsoon/ComingSoon";
import Dashboard from "../pages/home/Dashboard";
import Promotion from "../pages/promotion/Promotion";
import AddBankAccount from "../pages/wallet/Component/AddBankAccount";
import Bankaccount from "../pages/wallet/Component/Bankaccount";
import Depositehistory from "../pages/wallet/Component/Depositehistory";
import Withdraval from "../pages/wallet/Component/Withdraval";
import Withdrawlhistory from "../pages/wallet/Component/Withdrawlhistory";
import Wallet from "../pages/wallet/Wallet";
import Wingo from "../pages/wingo/Wingo";
import Activity from "../pages/activity/Activity";
import Deposite from "../pages/wallet/Component/Deposite";
import BankDetails from "../pages/bank/BankDetails";
import Banks from "../pages/bank/Banks";
import UPIDetails from "../pages/upi/UPIDetails";
import FundMain from "../pages/fund/FundMain";
import FundReport from "../pages/fund/FundReport";
import FundTransfer from "../pages/fund/FundTransfer";
import FundRecieve from "../pages/fund/FundRecive";
import ViewSalaryIncome from "../pages/salaryIncome/ViewSalaryIncome";
import RegistrationBonus from "../pages/income/incomeSubSection/RegistrationBonus";
import MainPageOFIncome from "../pages/income/MainPageOFIncome";
import ReferralBonus from "../pages/income/incomeSubSection/ReferralBonus";
import TeamBettingBonus from "../pages/income/incomeSubSection/TeamBettingBonus";
import TeamSalaryBonus from "../pages/income/incomeSubSection/TeamSalaryBonus";
import RoyalityBonus from "../pages/income/incomeSubSection/RoyalityBonus";
import LevelBonus from "../pages/income/incomeSubSection/LevelBonus";
import ICOLevelBonus from "../pages/income/incomeSubSection/ICOLevelBonus";
import BettingBonus from "../pages/income/incomeSubSection/BettingBonus";
import AllLevelOfTeam from "../pages/myteam/AllLevelOfTeam";
import Tables from "../pages/myteam/Tables";
import TeamIncome from "../pages/account/TeamIncome";
import TeamReport from "../pages/promotion/TeamReport";
import TeamData from "../pages/promotion/TeamData";
import MyCommission from "../pages/promotion/MyCommission";
import Subordinates from "../pages/promotion/Subordinates";
import Server from "../pages/promotion/Server";
import RebateRatio from "../pages/promotion/RebateRatio";
import PromotionRule from "../pages/promotion/PromotionRule";
import ChangePassword from "../pages/password/ChangePassword";
import AccountPassword from "../pages/password/AccountPassword";
import TransactionPassword from "../pages/password/TransactionPassword";
import Soon from "../pages/comingsoon/Soon";
import WithdrawalAccount from "../pages/wallet/Component/WithdrawalAccount";
import P2PTransfer from "../pages/wallet/Component/P2PTransfer";
import P2Pmoney from "../pages/fund/P2Pmoney";


export const routes = [
    {
        path:"/RiskDisclosureAgreement",
        element:<RiskDisclosureAgreement />
    },
    {
        path:"/supportPage",
        element:<SupportPage />
    },
    {
        path:"/dashboard",
        element:<Dashboard />
    },
    {
        path:"/withdrawlhistory",
        element:<Withdrawlhistory />
    },
    {
        path:"/depositehistory",
        element:<Depositehistory />
    },
    {
        path:"/promotion",
        element:<Promotion />
    },
    {
        path:"/wallet",
        element:<Wallet />
    },
    {
        path:"/bankcard",
        element:<Bankaccount />
    },
    {
        path:"/addbankaccount",
        element:<AddBankAccount />
    },
    {
        path:"/account",
        element:<Account />
    },
    {
        path:"/activity",
        element:<Activity />
    },
    {
        path:"/wingo",
        element:<Wingo />
    },
    {
        path:"/CustomerService",
        element:<Contactus />
    },
    {
        path:"/ServiceCollections",
        element:<ServiceCollections />
    },
    {
        path:"/comingsoon",
        element:<ComingSoon />
    },
    {
        path:"/comingsoonavaitor",
        element:<Soon />
    },
    // {
    //     path:"/withdraw",
    //     element:<Withdraval />
    // },
    {
        path:"/withdraw",
        element:<WithdrawalAccount />
    },
    {
        path:"/p2p",
        element:<P2PTransfer />
    },
    
    {
        path:"/deposit",
        element:<Deposite />
    },
    {
        path:"/bank",
        element:<BankDetails />
    },
    {
        path:"/banks-details",
        element:<Banks />
    },
    {
        path:"/banks-upi",
        element:<UPIDetails />
    },
    {
        path:"/fund-main",
        element:<FundMain />
    },
    {
        path:"/addmoneyp2p",
        element:<P2Pmoney />
    },
    {
        path:"/fund-report",
        element:<FundReport />
    },
    {
        path:"/fund-transfer",
        element:<FundTransfer />
    },
    {
        path:"/fund-recieve",
        element:<FundRecieve />
    },
    {
        path:"/view-salary-income",
        element:<ViewSalaryIncome />
    },
    {
        path:"/account/income-main/registration-bonus",
        element:<RegistrationBonus />
    },
    {
        path:"/account/income-main",
        element:<MainPageOFIncome />
    },
    {
        path:"/account/income-main/referral-bonus",
        element:<ReferralBonus />
    },
    {
        path:"/account/income-main/team-betting-bonus",
        element:<TeamBettingBonus />
    },
    {
        path:"/account/income-main/team-salary-bonus",
        element:<TeamSalaryBonus />
    },
    {
        path:"/account/income-main/royality-bonus",
        element:<RoyalityBonus />
    },
    {
        path:"/account/income-main/level-bonus",
        element:<LevelBonus />
    },
    {
        path:"/account/income-main/ico-level-bonus",
        element:<ICOLevelBonus />
    },
    {
        path:"/account/income-main/betting-bonus",
        element:<BettingBonus />
    },
    {
        path:"/account/income-main/my-team",
        element:<AllLevelOfTeam />
    },
    {
        path:"/account/income-main/my-team/levels",
        element:<Tables />
    },
    {
        path:"/account/Teamincome",
        element:<TeamIncome />
    },
    {
        path:"/promotion/TeamReport",
        element:<TeamReport />
    },
    {
        path:"/promotion/Teamdata",
        element:<TeamData />
    },
    {
        path:"/promotion/MyCommission",
        element:<MyCommission />
    },
    {
        path:"/promotion/Subordinates",
        element:<Subordinates />
    },
    {
        path:"/promotion/Server",
        element:<Server />
    },
    {
        path:"/promotion/Rebate",
        element:<RebateRatio />
    },
    {
        path:"/promotion/PromotionRule",
        element:<PromotionRule />
    },
    {
        path:"password",
        element:<ChangePassword />
    },
    {
        path:"/password/account",
        element:<AccountPassword />
    },
    {
        path:"/password/transction",
        element:<TransactionPassword />
    },
    {
        path:"/password/account",
        element:<AccountPassword />
    },
   
]