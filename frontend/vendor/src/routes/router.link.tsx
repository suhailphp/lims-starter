import { Navigate, Route } from "react-router-dom";
import { Path } from "./path";
import Loadable from "./loadable";
import { AddAgents, AddInvoice, AddPrompt, AddTemplate, AgentMetrics, AiTools, AllAgents, AllGenerators, AnalyticsDashboard, ApexChart, ApiKeys, AudioGenerator, AudioGeneratorHistory, AuditTrails, Billing, BillingDetails, Calendar, Chat, Collaborations, ComingSoon, Dashboard, DataTables, EditAgents, EditInvoice, EditTemplate, Error404, Error500, Faq, FileManager, FlyerGenerator, FlyerGeneratorResult, ForgotPassword, FormEditors, FormElements, FormPickers, FormSelect2, Gallery, GeneralSettings, History, ImageGenerator, ImageGeneratorHelp, ImageGeneratorResults, InvoiceDetails, Invoices, KanbanBoard, LayoutFullwidth, LayoutHidden, LayoutHoverview, LayoutMini, LayoutRtl, Login, ModalSettings, Notes, NotificationSettings, Permission, PolicyGenerator, PolicyGeneratorResult, PresentationGenerator, PresentationGeneratorResult, PresentationSlider, Pricing, PrivacyPolicy, Profile, Projects, PromptTemplates, ProposalGenerator, ProposalGeneratorResult, Register, ResetPassword, ResumeGenerator, ResumeGeneratorResult, SearchResults, SecuritySettings, SocialFeed, Starter, SystemDashboard, TablesBasic, Tenants, TermsConditions, TextGenerator, TextGeneratorResults, Todo, TwoColumnLayout, TwoStepVerification, UiAccordion, UiAlerts, UiAvatar, UiBadges, UiBreadcrumb, UiButtons, UiButtonsGroup, UiCards, UiClipboard, UiCollapse, UiColors, UiDragula, UiDropdowns, UiGrid, UiImages, UiLightbox, UiModals, UiOffcanvas, UiPagination, UiProgress, UiRangeslider, UiTabs, UiToasts, UiTypography, UnderMaintenance, UserRoles, VideoGenerator, VideoGeneratorHistory, VideoGeneratorSuccess, VideoPromptGenerator, VoiceGenerator, VoiceGeneratorHistory, VoiceGeneratorSuccess, VoicePromptGenerator } from "./lazyRoutes";
import IconFontawesome from "../pages/ui-elements/icons-ui/iconFontawesome";
import IconTabler from "../pages/ui-elements/icons-ui/iconTabler";
import IconLucide from "../pages/ui-elements/icons-ui/iconLucide";
import IconPhosphor from "../pages/ui-elements/icons-ui/iconPhosphor";
import Widgets from "../pages/ui-elements/widgets";

const DashboardPage = Loadable(Dashboard);
const AnalyticsDashboardPage = Loadable(AnalyticsDashboard);
const SystemDashboardPage = Loadable(SystemDashboard);
const AllAgentsPage = Loadable(AllAgents);
const AddAgentsPage = Loadable(AddAgents);
const EditAgentsPage = Loadable(EditAgents);
const AgentMetricsPage = Loadable(AgentMetrics);
const ProjectsPage = Loadable(Projects);
const CalendarPage = Loadable(Calendar);
const ChatPage = Loadable(Chat);
const FileManagerPage = Loadable(FileManager);
const KanbanPage = Loadable(KanbanBoard);
const TodoPage = Loadable(Todo);
const NotesPage = Loadable(Notes);
const SocialFeedPage = Loadable(SocialFeed);
const SearchResultsPage = Loadable(SearchResults);
const InvoicesPage = Loadable(Invoices);
const AddInvoicePage = Loadable(AddInvoice);
const EditInvoicePage = Loadable(EditInvoice);
const InvoiceDetailsPage = Loadable(InvoiceDetails);
const GeneralSettingsPage = Loadable(GeneralSettings);
const SecuritySettingsPage = Loadable(SecuritySettings);
const NotificationSettingsPage = Loadable(NotificationSettings);
const ModalSettingsPage = Loadable(ModalSettings);
const ApiKeysPage = Loadable(ApiKeys);
const AuditTrailsPage = Loadable(AuditTrails);
const BillingPage = Loadable(Billing);
const BillingDetailsPage = Loadable(BillingDetails);
const TenantsPage = Loadable(Tenants);
const UserRolesPage = Loadable(UserRoles);
const PermissionPage = Loadable(Permission);
const ProfilePage = Loadable(Profile);
const FaqPage = Loadable(Faq);
const GalleryPage = Loadable(Gallery);
const PricingPage = Loadable(Pricing);
const PrivacyPolicyPage = Loadable(PrivacyPolicy);
const TermsConditionsPage = Loadable(TermsConditions);
const StarterPage = Loadable(Starter);
const UiAlertsPage = Loadable(UiAlerts);
const UiAccordionPage = Loadable(UiAccordion);
const UiAvatarPage = Loadable(UiAvatar);
const UiBadgesPage = Loadable(UiBadges);
const UiBreadcrumbPage = Loadable(UiBreadcrumb);
const UiButtonsPage = Loadable(UiButtons);
const UiButtonsGroupPage = Loadable(UiButtonsGroup);
const UiCardsPage = Loadable(UiCards);
const UiCollapsePage = Loadable(UiCollapse);
const UiColorsPage = Loadable(UiColors);
const UiDropdownsPage = Loadable(UiDropdowns);
const UiGridPage = Loadable(UiGrid);
const UiImagesPage = Loadable(UiImages);
const UiModalsPage = Loadable(UiModals);
const UiOffcanvasPage = Loadable(UiOffcanvas);
const UiPaginationPage = Loadable(UiPagination);
const UiProgressPage = Loadable(UiProgress);
const UiTabsPage = Loadable(UiTabs);
const UiToastsPage = Loadable(UiToasts);
const UiTypographyPage = Loadable(UiTypography);
const TablesBasicPage = Loadable(TablesBasic);
const DataTablesPage = Loadable(DataTables);
const ApexChartPage =  Loadable(ApexChart)
const LoginPage = Loadable(Login);
const RegisterPage = Loadable(Register);
const ForgotPasswordPage = Loadable(ForgotPassword);
const ResetPasswordPage = Loadable(ResetPassword);
const TwoStepVerificationPage = Loadable(TwoStepVerification);
const Error404Page = Loadable(Error404);
const Error500Page = Loadable(Error500);
const ComingSoonPage = Loadable(ComingSoon);
const UnderMaintenancePage = Loadable(UnderMaintenance);
const FlyerGeneratorPage = Loadable(FlyerGenerator);
const AiToolsPage = Loadable(AiTools);
const FlyerGeneratorResultPage = Loadable(FlyerGeneratorResult);
const PresentationGeneratorPage = Loadable(PresentationGenerator);
const PresentationGeneratorResultPage = Loadable(PresentationGeneratorResult);
const PresentationSliderPage = Loadable(PresentationSlider);
const ProposalGeneratorPage = Loadable(ProposalGenerator);
const ProposalGeneratorResultPage = Loadable(ProposalGeneratorResult);
const ResumeGeneratorPage = Loadable(ResumeGenerator);
const PolicyGeneratorPage = Loadable(PolicyGenerator);
const PolicyGeneratorResultPage = Loadable(PolicyGeneratorResult);
const AllGeneratorsPage = Loadable(AllGenerators);
const ImageGeneratorPage = Loadable(ImageGenerator);
const ImageGeneratorResultPage = Loadable(ImageGeneratorResults);
const ImageGeneratorHelpPage = Loadable(ImageGeneratorHelp);
const VideoGeneratorPage = Loadable(VideoGenerator);
const VideoGeneratorHistoryPage = Loadable(VideoGeneratorHistory);
const VideoPromptGeneratorPage = Loadable(VideoPromptGenerator);
const VideoGeneratorSuccessPage = Loadable(VideoGeneratorSuccess);
const AudioGeneratorPage = Loadable(AudioGenerator);
const AudioGeneratorHistoryPage = Loadable(AudioGeneratorHistory);
const TextGeneratorPage = Loadable(TextGenerator);
const TextGeneratorResultsPage = Loadable(TextGeneratorResults);
const VoiceGeneratorPage = Loadable(VoiceGenerator);
const VoiceGeneratorHistoryPage = Loadable(VoiceGeneratorHistory);
const VoiceGeneratorSuccessPage = Loadable(VoiceGeneratorSuccess);
const VoicePromptGeneratorPage = Loadable(VoicePromptGenerator);
const ResumeGeneratorResultPage = Loadable(ResumeGeneratorResult);
const PromptTemplatesPage = Loadable(PromptTemplates);
const AddPromptPage = Loadable(AddPrompt);
const AddTemplatePage = Loadable(AddTemplate);
const EditTemplatePage = Loadable(EditTemplate);
const HistoryPage = Loadable(History);
const CollaborationsPage = Loadable(Collaborations);
const LayoutMiniPage = Loadable(LayoutMini);
const LayoutHoverviewPage = Loadable(LayoutHoverview);
const LayoutHiddenPage = Loadable(LayoutHidden);
const LayoutFullwidthPage = Loadable(LayoutFullwidth);
const LayoutRtlPage = Loadable(LayoutRtl);
const TwoColumnLayoutPage = Loadable(TwoColumnLayout);
const UiDragulaPage = Loadable(UiDragula);
const UiClipboardPage = Loadable(UiClipboard);
const UiRangesliderPage = Loadable(UiRangeslider);
const UiLightboxPage = Loadable(UiLightbox);
const FormElementsPage = Loadable(FormElements);
const FormSelect2Page = Loadable(FormSelect2);
const FormEditorsPage = Loadable(FormEditors);
const FormPickersPage = Loadable(FormPickers);

const routes = Path;

export const publicRoutes = [
  {
    path: "/",
    name: "Root",
    element: <Navigate to={routes.dashboard} />,
    route: Route,
  },
  {
    id: "1",
    path: routes.dashboard,
    element: <DashboardPage />,
    route: Route,
    meta_title: "Dashboard",
  },
  {
    id: "3",
    path: routes.analyticsDashboard,
    element: <AnalyticsDashboardPage />,
    route: Route,
    meta_title: "Dashboard",
  },
  {
    id: "4",
    path: routes.systemDashboard,
    element: <SystemDashboardPage />,
    route: Route,
    meta_title: "Dashboard",
  },
  {
    id: "5",
    path: routes.agents,
    element: <AllAgentsPage />,
    route: Route,
    meta_title: "Agents",
  },
  {
    id: "6",
    path: routes.addAgent,
    element: <AddAgentsPage />,
    route: Route,
    meta_title: "Agents",
  },
  {
    id: "7",
    path: routes.editAgent,
    element: <EditAgentsPage />,
    route: Route,
    meta_title: "Agents",
  },
  {
    id: "8",
    path: routes.agentMetrics,
    element: <AgentMetricsPage />,
    route: Route,
    meta_title: "Agents",
  },
  {
    id: "",
    path: routes.projects,
    element: <ProjectsPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.calendar,
    element: <CalendarPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.chat,
    element: <ChatPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.invoices,
    element: <InvoicesPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.addInvoice,
    element: <AddInvoicePage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.editInvoice,
    element: <EditInvoicePage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.invoiceDetails,
    element: <InvoiceDetailsPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.fileManager,
    element: <FileManagerPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.searchResults,
    element: <SearchResultsPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.socialFeed,
    element: <SocialFeedPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.imageGeneratorResult,
    element: <ImageGeneratorResultPage />,
    route: Route,
    meta_title: "Image GEnerator",
  },
  {
    id: "",
    path: routes.imageGeneratorHelp,
    element: <ImageGeneratorHelpPage />,
    route: Route,
    meta_title: "Image GEnerator",
  },
  {
    id: "",
    path: routes.kanbanBoard,
    element: <KanbanPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.notes,
    element: <NotesPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.todo,
    element: <TodoPage />,
    route: Route,
    meta_title: "Application",
  },
  {
    id: "",
    path: routes.generalSettings,
    element: <GeneralSettingsPage />,
    route: Route,
    meta_title: "General Settings",
  },
  {
    id: "",
    path: routes.notificationsSettings,
    element: <NotificationSettingsPage />,
    route: Route,
    meta_title: "Notification Settings",
  },
  {
    id: "",
    path: routes.securitySettings,
    element: <SecuritySettingsPage />,
    route: Route,
    meta_title: "Security Settings",
  },
  {
    id: "",
    path: routes.modelSettings,
    element: <ModalSettingsPage />,
    route: Route,
    meta_title: "Modal Settings",
  },
  {
    id: "",
    path: routes.apiKeys,
    element: <ApiKeysPage />,
    route: Route,
    meta_title: "Api Keys",
  },
  {
    id: "",
    path: routes.auditTrails,
    element: <AuditTrailsPage />,
    route: Route,
    meta_title: "Auddit Trails",
  },
  {
    id: "",
    path: routes.tenants,
    element: <TenantsPage />,
    route: Route,
    meta_title: "Tenants",
  },
  {
    id: "",
    path: routes.billing,
    element: <BillingPage />,
    route: Route,
    meta_title: "Billing",
  },
  {
    id: "",
    path: routes.billingDetails,
    element: <BillingDetailsPage />,
    route: Route,
    meta_title: "Billing",
  },
  {
    id: "",
    path: routes.userRoles,
    element: <UserRolesPage />,
    route: Route,
    meta_title: "User Roles",
  },
  {
    id: "",
    path: routes.permission,
    element: <PermissionPage />,
    route: Route,
    meta_title: "Permission",
  },
  {
    id: "",
    path: routes.profile,
    element: <ProfilePage />,
    route: Route,
    meta_title: "Profile",
  },
  {
    id: "",
    path: routes.faq,
    element: <FaqPage />,
    route: Route,
    meta_title: "Faq",
  },
  {
    id: "",
    path: routes.gallery,
    element: <GalleryPage />,
    route: Route,
    meta_title: "Faq",
  },
  {
    id: "",
    path: routes.pricing,
    element: <PricingPage />,
    route: Route,
    meta_title: "Pricing",
  },
  {
    id: "",
    path: routes.privacyPolicy,
    element: <PrivacyPolicyPage />,
    route: Route,
    meta_title: "Privacy Policy",
  },
  {
    id: "",
    path: routes.starterPage,
    element: <StarterPage />,
    route: Route,
    meta_title: "Starter",
  },
  {
    id: "",
    path: routes.termsConditions,
    element: <TermsConditionsPage />,
    route: Route,
    meta_title: "Terms & Conditions",
  },
  {
    id: "2",
    path: routes.uiAlerts,
    element: <UiAlertsPage />,
    route: Route,
    meta_title: "UI Alerts",
  },
  {
    id: "",
    path: routes.uiAccordion,
    element: <UiAccordionPage />,
    route: Route,
    meta_title: "UI Accordion",
  },
  {
    id: "",
    path: routes.uiAvatar,
    element: <UiAvatarPage />,
    route: Route,
    meta_title: "UI Avatar",
  },
  {
    id: "",
    path: routes.uiBadges,
    element: <UiBadgesPage />,
    route: Route,
    meta_title: "UI Badges",
  },
  {
    id: "",
    path: routes.uiBreadcrumb,
    element: <UiBreadcrumbPage />,
    route: Route,
    meta_title: "UI Breadcrumb",
  },
  {
    id: "",
    path: routes.uiButtons,
    element: <UiButtonsPage />,
    route: Route,
    meta_title: "UI Buttons",
  },
  {
    id: "",
    path: routes.uiButtonsGroup,
    element: <UiButtonsGroupPage />,
    route: Route,
    meta_title: "UI Buttons Group",
  },
  {
    id: "",
    path: routes.uiCards,
    element: <UiCardsPage />,
    route: Route,
    meta_title: "UI Cards",
  },
  {
    id: "",
    path: routes.uiCollapse,
    element: <UiCollapsePage />,
    route: Route,
    meta_title: "UI Collapse",
  },
  {
    id: "",
    path: routes.uiColors,
    element: <UiColorsPage />,
    route: Route,
    meta_title: "UI Colors",
  },
  {
    id: "",
    path: routes.uiDropdowns,
    element: <UiDropdownsPage />,
    route: Route,
    meta_title: "UI Dropdowns",
  },
  {
    id: "",
    path: routes.uiGrid,
    element: <UiGridPage />,
    route: Route,
    meta_title: "UI Grid",
  },
  {
    id: "",
    path: routes.uiImages,
    element: <UiImagesPage />,
    route: Route,
    meta_title: "UI Images",
  },
  {
    id: "",
    path: routes.uiModals,
    element: <UiModalsPage />,
    route: Route,
    meta_title: "UI Modals",
  },
  {
    id: "",
    path: routes.uiOffcanvas,
    element: <UiOffcanvasPage />,
    route: Route,
    meta_title: "UI Offcanvas",
  },
  {
    id: "",
    path: routes.uiPagination,
    element: <UiPaginationPage />,
    route: Route,
    meta_title: "UI Pagination",
  },
  {
    id: "",
    path: routes.uiProgress,
    element: <UiProgressPage />,
    route: Route,
    meta_title: "UI Progress",
  },
  {
    id: "",
    path: routes.uiNavTabs,
    element: <UiTabsPage />,
    route: Route,
    meta_title: "UI Tabs",
  },
  {
    id: "",
    path: routes.uiToasts,
    element: <UiToastsPage />,
    route: Route,
    meta_title: "UI Toasts",
  },
  {
    id: "",
    path: routes.uiTypography,
    element: <UiTypographyPage />,
    route: Route,
    meta_title: "UI Typography",
  },
  {
    id: "",
    path: routes.tablesBasic,
    element: <TablesBasicPage />,
    route: Route,
    meta_title: "Table Basic",
  },
  {
    id: "",
    path: routes.dataTables,
    element: <DataTablesPage />,
    route: Route,
    meta_title: "Data Table",
  },
  {
    id: "",
    path: routes.chartApex,
    element: <ApexChartPage />,
    route: Route,
    meta_title: "Apex Chart",
  },
  {
    id: "",
    path: routes.aiTools,
    element: <AiToolsPage />,
    route: Route,
    meta_title: "Ai Tools",
  },
  {
    id: "",
    path: routes.allGenerators,
    element: <AllGeneratorsPage />,
    route: Route,
    meta_title: "All Generators",
  },
  {
    id: "",
    path: routes.imageGenerator,
    element: <ImageGeneratorPage />,
    route: Route,
    meta_title: "Image Generator",
  },
  {
    id: "",
    path: routes.videoGenerator,
    element: <VideoGeneratorPage />,
    route: Route,
    meta_title: "Video Generator",
  },
  {
    id: "",
    path: routes.videoGeneratorHistory,
    element: <VideoGeneratorHistoryPage />,
    route: Route,
    meta_title: "Video Generator History",
  },
  {
    id: "",
    path: routes.videoPromptGenerator,
    element: <VideoPromptGeneratorPage />,
    route: Route,
    meta_title: "Video Prompt Generator",
  },
  {
    id: "",
    path: routes.videoGeneratorSuccess,
    element: <VideoGeneratorSuccessPage />,
    route: Route,
    meta_title: "Video Generator Success",
  },
  {
    id: "",
    path: routes.audioGenerator,
    element: <AudioGeneratorPage />,
    route: Route,
    meta_title: "Audio Generator",
  },
  {
    id: "",
    path: routes.audioGeneratorHistory,
    element: <AudioGeneratorHistoryPage />,
    route: Route,
    meta_title: "Audio Generator History",
  },
  {
    id: "",
    path: routes.textGenerator,
    element: <TextGeneratorPage />,
    route: Route,
    meta_title: "Text Generator",
  },
  {
    id: "",
    path: routes.textGeneratorResults,
    element: <TextGeneratorResultsPage />,
    route: Route,
    meta_title: "Text Generator Results",
  },
  {
    id: "",
    path: routes.voiceGenerator,
    element: <VoiceGeneratorPage />,
    route: Route,
    meta_title: "Voice Generator",
  },
  {
    id: "",
    path: routes.voiceGeneratorHistory,
    element: <VoiceGeneratorHistoryPage />,
    route: Route,
    meta_title: "Voice Generator History",
  },
  {
    id: "",
    path: routes.voiceGeneratorSuccess,
    element: <VoiceGeneratorSuccessPage />,
    route: Route,
    meta_title: "Voice Generator Success",
  },
  {
    id: "",
    path: routes.voicePromptGenerator,
    element: <VoicePromptGeneratorPage />,
    route: Route,
    meta_title: "Voice Prompt Generator",
  },
 {
    id: "",
    path: routes.promptTemplates,
    element: <PromptTemplatesPage />,
    route: Route,
    meta_title: "Prompt Templates",
  },
  {
    id: "",
    path: routes.addPrompt,
    element: <AddPromptPage />,
    route: Route,
    meta_title: "Add Prompt",
  },
  {
    id: "",
    path: routes.addTemplate,
    element: <AddTemplatePage />,
    route: Route,
    meta_title: "Add Template",
  },
  {
    id: "",
    path: routes.editTemplate,
    element: <EditTemplatePage />,
    route: Route,
    meta_title: "Edit Template",
  },
  {
    id: "",
    path: routes.history,
    element: <HistoryPage />,
    route: Route,
    meta_title: "History",
  },
  {
    id: "",
    path: routes.collaborations,
    element: <CollaborationsPage />,
    route: Route,
    meta_title: "Collaborations",
  },
  {
    id: "",
    path: routes.uiDragula,
    element: <UiDragulaPage />,
    route: Route,
    meta_title: "Dragula",
  },
  {
    id: "",
    path: routes.uiClipboard,
    element: <UiClipboardPage />,
    route: Route,
    meta_title: "Clipboard",
  },
  {
    id: "",
    path: routes.uiRangeslider,
    element: <UiRangesliderPage />,
    route: Route,
    meta_title: "Range Slider",
  },
  {
    id: "",
    path: routes.uiLightbox,
    element: <UiLightboxPage />,
    route: Route,
    meta_title: "Lightbox",
  },
  {
    id: "",
    path: routes.formElements,
    element: <FormElementsPage />,
    route: Route,
    meta_title: "Form Element",
  },
  {
    id: "",
    path: routes.formSelect2,
    element: <FormSelect2Page />,
    route: Route,
    meta_title: "Form Select 2",
  },
  {
    id: "",
    path: routes.formEditors,
    element: <FormEditorsPage />,
    route: Route,
    meta_title: "Form Editor",
  },
  {
    id: "",
    path: routes.formPickers,
    element: <FormPickersPage />,
    route: Route,
    meta_title: "Form Pickers",
  },
  {
    id: "",
    path: routes.iconFontawesome,
    element: <IconFontawesome />,
    route: Route,
    meta_title: "Icon Fontawesome",
  },
  {
    id: "",
    path: routes.iconTabler,
    element: <IconTabler />,
    route: Route,
    meta_title: "Icon Tabler",
  },
  {
    id: "",
    path: routes.iconLucide,
    element: <IconLucide />,
    route: Route,
    meta_title: "Icon Lucide",
  },
  {
    id: "",
    path: routes.iconPhosphor,
    element: <IconPhosphor />,
    route: Route,
    meta_title: "Icon Phosphor",
  },
  {
    id: "",
    path: routes.widgets,
    element: <Widgets />,
    route: Route,
    meta_title: "Widgets",
  },
  
];
export const authRoutes = [
  {
    id: "1",
    path: routes.login,
    element: <LoginPage />,
    route: Route,
    meta_title: "Login",
  },
  {
    id: "",
    path: routes.register,
    element: <RegisterPage />,
    route: Route,
    meta_title: "Register",
  },
  {
    id: "",
    path: routes.forgotPassword,
    element: <ForgotPasswordPage />,
    route: Route,
    meta_title: "Forgot Password",
  },
  {
    id: "",
    path: routes.resetPassword,
    element: <ResetPasswordPage />,
    route: Route,
    meta_title: "Reset Password",
  },
  {
    id: "",
    path: routes.twoStepVerification,
    element: <TwoStepVerificationPage />,
    route: Route,
    meta_title: "Two Step Verification",
  },
  {
    id: "",
    path: routes.error404,
    element: <Error404Page />,
    route: Route,
    meta_title: "Error 404",
  },
  {
    id: "",
    path: routes.error500,
    element: <Error500Page />,
    route: Route,
    meta_title: "Error 500",
  },
  {
    id: "",
    path: routes.comingSoon,
    element: <ComingSoonPage />,
    route: Route,
    meta_title: "Coming Soon",
  },
  {
    id: "",
    path: routes.maintenance,
    element: <UnderMaintenancePage />,
    route: Route,
    meta_title: "Maintenance",
  },
  
];
export const aitoolRoutes = [
  
  {
    id: "1",
    path: routes.flyerGenerator,
    element: <FlyerGeneratorPage />,
    route: Route,
    meta_title: "Flyer Generator",
  },
  {
    id: "2",
    path: routes.flyerGeneratorResult,
    element: <FlyerGeneratorResultPage />,
    route: Route,
    meta_title: "Flyer Generator Result",
  },
  {
    id: "2",
    path: routes.presentationGenerator,
    element: <PresentationGeneratorPage />,
    route: Route,
    meta_title: "Presentation Generator",
  },
  {
    id: "3",
    path: routes.presentationGenerator,
    element: <PresentationGeneratorPage />,
    route: Route,
    meta_title: "Presentation Generator",
  },
  {
    id: "4",
    path: routes.presentationGeneratorResult,
    element: <PresentationGeneratorResultPage />,
    route: Route,
    meta_title: "Presentation Generator Result",
  },
  {
    id: "5",
    path: routes.presentationSlider,
    element: <PresentationSliderPage />,
    route: Route,
    meta_title: "Presentation Slider",
  },
  {
    id: "6",
    path: routes.proposalGenerator,
    element: <ProposalGeneratorPage />,
    route: Route,
    meta_title: "Proposal Generator",
  },
   {
    id: "7",
    path: routes.proposalGeneratorResult,
    element: <ProposalGeneratorResultPage />,
    route: Route,
    meta_title: "Proposal Generator Result",
  },
   {
    id: "8",
    path: routes.resumeGenerator,
    element: <ResumeGeneratorPage />,
    route: Route,
    meta_title: "Resume Generator",
  },
   {
    id: "9",
    path: routes.resumeGeneratorResult,
    element: <ResumeGeneratorResultPage />,
    route: Route,
    meta_title: "Resume Generator Result",
  },
   {
    id: "10",
    path: routes.policyGeneratorResult,
    element: <PolicyGeneratorResultPage />,
    route: Route,
    meta_title: "Policy Generator Result",
  },
   {
    id: "11",
    path: routes.policyGenerator,
    element: <PolicyGeneratorPage />,
    route: Route,
    meta_title: "Policy Generator Result",
  },
];
export const layoutPagesRoutes = [
  {
    id: "",
    path: routes.layoutMini,
    element: <LayoutMiniPage />,
    route: Route,
    meta_title: "Layout Mini",
  },
  {
    id: "",
    path: routes.layoutHoverview,
    element: <LayoutHoverviewPage />,
    route: Route,
    meta_title: "Layout Hoverview",
  },
  {
    id: "",
    path: routes.layoutHidden,
    element: <LayoutHiddenPage />,
    route: Route,
    meta_title: "Layout Hidden",
  },
  {
    id: "",
    path: routes.layoutFullwidth,
    element: <LayoutFullwidthPage />,
    route: Route,
    meta_title: "Layout Full Width",
  },
  {
    id: "",
    path: routes.rtl,
    element: <LayoutRtlPage />,
    route: Route,
    meta_title: "Layout RTL",
  },
  {
    id: "",
    path: routes.twoColumn,
    element: <TwoColumnLayoutPage />,
    route: Route,
    meta_title: "Two Column",
  },
];