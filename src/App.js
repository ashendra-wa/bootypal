import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Users from "./pages/user/List";
import UniversityList from "./pages/university/List";
import UniversityAdd from "./pages/university/Add";
import FaqList from "./pages/faq/List";
import FaqAdd from "./pages/faq/Add";
import ReportElementList from "./pages/reportElement/List";
import ReportElementForm from "./pages/reportElement/Form";
import SettingList from "./pages/setting/List";
import SettingForm from "./pages/setting/Form";
import OfferList from "./pages/offer/List";
import OfferForm from "./pages/offer/Form";
import UserProfile from "./pages/AdminProfile";
import PlanList from "./pages/plan/List";
import PlanForm from "./pages/plan/Form";
import ContactUsList from "./pages/contactUs/List";
import EventList from "./pages/event/List";
import PostList from "./pages/post/List";

import BlogList from "./pages/blog/List";
import BlogForm from "./pages/blog/Add";

import BlogCategoryList from "./pages/blogCategory/List";
import BlogCategoryForm from "./pages/blogCategory/Add";
import FeedbackList from "./pages/feedback/List";
import PostReportList from "./pages/chatReport/List";
import MailSendList from "./pages/MailSend/List";
import MailSendForm from "./pages/MailSend/Form";
import EventForm from "./pages/event/Form";
import PostForm from "./pages/post/Form";
import HobbiesList from "./pages/hobbies/List";
import HobbiesForm from "./pages/hobbies/Form";

import LanguagesList from "./pages/languages/List";
import LanguagesForm from "./pages/languages/Form";

import FoodPreferenceList from "./pages/foodPreference/List";
import FoodPreferenceForm from "./pages/foodPreference/Form";
import ChatBlockList from "./pages/chatBlock/List";
import DeleteAccount from "./pages/DeleteAccount";
import EventCategoryList from "./pages/eventCategory/List";
import EventCategoryForm from "./pages/eventCategory/Form";
import LookingFor from "./pages/lookingfor/List";
import LanguageSpeak from "./pages/languageSpeak/List";
import ReligiousBeliefs from "./pages/religiousBeliefs/List";
import LookingForForm from "./pages/lookingfor/Add";
import ReligiousBeliefsForm from "./pages/religiousBeliefs/Add";

import languageSpeakForm from "./pages/languageSpeak/Add";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/delete-account" exact component={DeleteAccount} />
        <Main>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/university" component={UniversityList} />
          <Route exact path="/university/add" component={UniversityAdd} />
          <Route
            exact
            path="/university-update/:universityId"
            component={UniversityAdd}
          />

          <Route exact path="/faq" component={FaqList} />
          <Route exact path="/faq/add" component={FaqAdd} />
          <Route exact path="/faq/update/:faqId" component={FaqAdd} />

          <Route exact path="/report-element" component={ReportElementList} />
          <Route
            exact
            path="/report-element/add"
            component={ReportElementForm}
          />
          <Route
            exact
            path="/report-element/update/:reportElementId"
            component={ReportElementForm}
          />

          <Route exact path="/languages" component={LanguagesList} />
          <Route exact path="/languages/add" component={LanguagesForm} />
          <Route
            exact
            path="/languages/update/:languageId"
            component={LanguagesForm}
          />

          <Route exact path="/hobbies" component={HobbiesList} />
          <Route exact path="/hobbies/add" component={HobbiesForm} />
          <Route
            exact
            path="/hobbies/update/:hobbiesId"
            component={HobbiesForm}
          />

          <Route exact path="/food-preference" component={FoodPreferenceList} />
          <Route
            exact
            path="/food-preference/add"
            component={FoodPreferenceForm}
          />
          <Route
            exact
            path="/food-preference/update/:foodPreferenceId"
            component={FoodPreferenceForm}
          />

          <Route exact path="/setting" component={SettingList} />
          <Route exact path="/setting/add" component={SettingForm} />
          <Route
            exact
            path="/setting/update/:settingId"
            component={SettingForm}
          />

          <Route exact path="/offer" component={OfferList} />
          <Route exact path="/offer/add" component={OfferForm} />
          <Route exact path="/offer/update/:offerId" component={OfferForm} />

          <Route exact path="/plan" component={PlanList} />
          <Route exact path="/plan/add" component={PlanForm} />
          <Route exact path="/plan/update/:planId" component={PlanForm} />

          <Route exact path="/send-mail" component={MailSendList} />
          <Route exact path="/send-mail/add" component={MailSendForm} />

          <Route exact path="/contact-us" component={ContactUsList} />
          <Route exact path="/feedbacks" component={FeedbackList} />
          <Route exact path="/chat-report" component={PostReportList} />
          <Route exact path="/chat-block" component={ChatBlockList} />

          <Route exact path="/event-category" component={EventCategoryList} />
          <Route
            exact
            path="/event-category/add"
            component={EventCategoryForm}
          />
          <Route
            exact
            path="/event-category/update/:planId"
            component={EventCategoryForm}
          />

          <Route exact path="/event" component={EventList} />
          <Route exact path="/event/add" component={EventForm} />

          <Route exact path="/post" component={PostList} />
          <Route exact path="/post/add" component={PostForm} />

          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/users/:userId" component={Profile} />

          <Route exact path="/blog-category" component={BlogCategoryList} />
          <Route exact path="/blog-category/add" component={BlogCategoryForm} />
          <Route
            exact
            path="/blog-category/update/:blogId"
            component={BlogCategoryForm}
          />

          <Route exact path="/blogs" component={BlogList} />
          <Route exact path="/blog/add" component={BlogForm} />
          <Route exact path="/blog/update/:blogId" component={BlogForm} />
          <Route exact path="/looking-for" component={LookingFor} />
          <Route exact path="/religious-beliefs" component={ReligiousBeliefs} />
          <Route exact path="/language-speak" component={LanguageSpeak} />
          <Route exact path="/looking-for/Add" component={LookingForForm} />
          <Route
            exact
            path="/looking-for/update/:LookingForId"
            component={LookingForForm}
          />
          <Route
            exact
            path="/religious-beliefs/update/:ReligiousBeliefsId"
            component={ReligiousBeliefsForm}
          />
          <Route
            exact
            path="/religious-beliefs/add"
            component={ReligiousBeliefsForm}
          />
          <Route
            exact
            path="/language-speak/add"
            component={languageSpeakForm}
          />
          <Route
            exact
            path="/language-speak/update/:languageSpeakId"
            component={languageSpeakForm}
          />
          {/* <Redirect from="*" to="/dashboard" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
