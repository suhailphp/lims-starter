
import { Path } from "../../routes/path";
import type { SidebarDataType } from "../../types/types";

export const sidebarData: SidebarDataType[] = [
  {
    id: "dashboard",
    mainicon: "ph-circles-four",
    menutitle: "Dashboard",
    submenuSections: [
      {
        title: "Dashboard",
        items: [
          {
            label: "AI Dashboard",
            icon: "icon-wand-sparkles",
            link: Path.dashboard,
          },
          {
            label: "Analytics",
            icon: "icon-chart-area",
            link: Path.analyticsDashboard,
          },
          {
            label: "System Overview",
            icon: "icon-circle-gauge",
            link: Path.systemDashboard,
          },
        ],
      },
      {
        title: "Apps",
        items: [
          {
            label: "Projects",
            icon: "icon-clipboard-minus",
            link: Path.projects,
          },
          {
            label: "Chat",
            icon: "icon-message-circle-more",
            link: Path.chat,
            badge: "3",
          },
          {
            label: "Calendar",
            icon: "icon-calendar-days",
            link: Path.calendar,
          },
          {
            label: "Invoices",
            icon: "icon-file-text",
            link: Path.invoices,
            badge: "2",
            badgeClass: "bg-info",
            dataParent: "invoice",
            relativeLink:[Path.invoiceDetails,Path.addInvoice,Path.editInvoice]
          },
          {
            label: "File Manager",
            icon: "icon-folder-open-dot",
            link: Path.fileManager,
          },
          {
            label: "Notes",
            icon: "icon-file-pen-line",
            link: Path.notes,
          },
          {
            label: "To Do",
            icon: "icon-list-todo",
            link: Path.todo,
            badge: "5",
          },
          {
            label: "Kanban Board",
            icon: "icon-square-kanban",
            link: Path.kanbanBoard,
          },
          {
            label: "Social Feed",
            icon: "icon-book-marked",
            link: Path.socialFeed,
          },
          {
            label: "Search Results",
            icon: "icon-search-check",
            link: Path.searchResults,
          },
        ],
      },
    ],
  },
  {
    id: "layout-pages",
    mainicon: "ph-align-top",
    menutitle: "Layout Pages",
    submenuSections: [
      {
        title: "Layouts",
        items: [
          {
            label: "Mini Sidebar",
            icon: "icon-wand-sparkles",
            link: Path.layoutMini,
          },
          {
            label: "Hover View",
            icon: "icon-chart-area",
            link: Path.layoutHoverview,
          },
          {
            label: "Hidden Menu",
            icon: "icon-circle-gauge",
            link: Path.layoutHidden,
          },
          {
            label: "Full Width",
            icon: "icon-layout-panel-top",
            link: Path.layoutFullwidth,
          },
          {
            label: "Two Column",
            icon: "icon-layout-panel-left",
            link: Path.twoColumn,
          },
          {
            label: "RTL",
            icon: "icon-panel-right-open",
            link: Path.rtl,
          },
        ],
      },
    ],
  },
  {
    id: "ai-agents",
    mainicon: "ph-cube",
    menutitle: "AI Agents",
    submenuSections: [
      {
        title: "AI Agents",
        items: [
          {
            label: "All Agents",
            icon: "icon-bot",
            link: Path.agents,
            relativeLink: Path.editAgent,
          },
          {
            label: "Create Agent",
            icon: "icon-circle-fading-plus",
            link: Path.addAgent,
          },
          {
            label: "Agent Metrics",
            icon: "icon-file-chart-pie",
            link: Path.agentMetrics,
          },
        ],
      },
    ],
  },
  {
    id: "ai-studio",
    mainicon: "ph-drone",
    menutitle: "AI Studio",
    submenuSections: [
      {
        title: "AI Studio",
        items: [
          {
            label: "All Generators",
            icon: "icon-boxes",
            link: Path.allGenerators,
          },
          {
            label: "Image Generator",
            icon: "icon-image",
            link: Path.imageGenerator,
            relativeLink:[Path.imageGeneratorResult,Path.imageGeneratorHelp]
          },
          {
            label: "Video Generator",
            icon: "icon-video",
            link: Path.videoGenerator,
            relativeLink:[ Path.videoGeneratorHistory, Path.videoGeneratorSuccess,Path.videoPromptGenerator],
          },
          {
            label: "Audio Generator",
            icon: "icon-audio-lines",
            link: Path.audioGenerator,
           relativeLink: Path.audioGeneratorHistory,
          },
          {
            label: "Text Generator",
            icon: "icon-text-initial",
            link: Path.textGenerator,
           relativeLink: Path.textGeneratorResults,
          },
          {
            label: "Voice Generator",
            icon: "icon-audio-waveform",
            link: Path.voiceGenerator,
            relativeLink:[ Path.voiceGeneratorHistory, Path.voiceGeneratorSuccess,Path.voicePromptGenerator],
          },
          {
            label: "Prompt Templates",
            icon: "icon-rectangle-ellipsis",
            link: Path.promptTemplates,
            relativeLink:[Path.addPrompt, Path.editTemplate,Path.addTemplate],
          },
          {
            label: "History",
            icon: "icon-calendar-clock",
            link: Path.history,
          },
          {
            label: "Collaborations",
            icon: "icon-calendar-clock",
            link: Path.collaborations,
          },
        ],
      },
    ],
  },
  {
    id: "ai-tools",
    mainicon: "ph-scroll",
    menutitle: "AI Tools",
    submenuSections: [
      {
        title: "AI Tools",
        items: [
          {
            label: "All Tools",
            icon: "icon-bot",
            link: Path.aiTools, 
          },
          {
            label: "Flyer / Brochure",
            icon: "icon-file-text",
            link: Path.flyerGenerator,
            relativeLink: Path.flyerGeneratorResult,
          },
          {
            label: "PowerPoint",
            icon: "icon-presentation",
            link: Path.presentationGenerator,
           relativeLink: Path.presentationGeneratorResult,
          },
          {
            label: "Proposal",
            icon: "icon-file-badge",
            link: Path.proposalGenerator,
          },
          {
            label: "Resume",
            icon: "icon-file-pen-line",
            link: Path.resumeGenerator,
            relativeLink: Path.resumeGeneratorResult,
          },
          {
            label: "Policy Document",
            icon: "icon-file-key",
            link: Path.policyGenerator,
            relativeLink: Path.policyGeneratorResult,
          },
        ],
      },
    ],
  },
  {
    id: "security",
    mainicon: "ph-poker-chip",
    menutitle: "Security",
    submenuSections: [
      {
        title: "System & Security",
        items: [
          {
            label: "API Keys",
            icon: "icon-key-square",
            link: Path.apiKeys,
          },
          {
            label: "Audit Trails",
            icon: "icon-badge-dollar-sign",
            link: Path.auditTrails,
          },
          {
            label: "Tenants",
            icon: "icon-users",
            link: Path.tenants,
          },
          {
            label: "Billing",
            icon: "icon-file-text",
            link: Path.billing,
            relativeLink: Path.billingDetails,
          },
          {
            label: "Users & Roles",
            icon: "icon-user-round-cog",
            link: Path.userRoles,
            dataParent: "user-roles",
            relativeLink: Path.permission,
          },
        ],
      },
    ],
  },
  {
    id: "settings",
    mainicon: "ph-wrench",
    menutitle: "Settings",
    submenuSections: [
      {
        title: "Settings",
        items: [
          {
            label: "General Settings",
            icon: "icon-user-pen",
            link: Path.generalSettings,
          },
          {
            label: "Notifications",
            icon: "icon-bell",
            link: Path.notificationsSettings,
          },
          {
            label: "Security Settings",
            icon: "icon-shield",
            link: Path.securitySettings,
          },
          {
            label: "Model Settings",
            icon: "icon-square-dashed-bottom-code text-base",
            link: Path.modelSettings,
          },
        ],
      },
    ],
  },
  {
    id: "pages",
    mainicon: "ph-files",
    menutitle: "Pages",
    submenuSections: [
      {
        title: "Authentication",
        items: [
          {
            label: "Login",
            icon: "icon-log-in",
            link: Path.login,
          },
          {
            label: "Register",
            icon: "icon-user-round-check",
            link: Path.register,
          },
          {
            label: "Forgot Password",
            icon: "icon-triangle-alert",
            link: Path.forgotPassword,
          },
          {
            label: "Reset Password",
            icon: "icon-refresh-ccw",
            link: Path.resetPassword,
          },
          {
            label: "2 Step Verification",
            icon: "icon-shield-ellipsis",
            link: Path.twoStepVerification,
          },
        ],
      },
      {
        title: "Error Pages",
        items: [
          {
            label: "Error 404",
            icon: "icon-circle-alert",
            link: Path.error404,
          },
          {
            label: "Error 500",
            icon: "icon-circle-alert",
            link: Path.error500,
          },
        ],
      },
      {
        title: "General Pages",
        items: [
          {
            label: "Profile",
            icon: "icon-circle-user-round",
            link: Path.profile,
          },
          {
            label: "Gallery",
            icon: "icon-image",
            link: Path.gallery,
          },
          {
            label: "Pricing",
            icon: "icon-badge-dollar-sign",
            link: Path.pricing,
          },
          {
            label: "FAQ",
            icon: "icon-file-question-mark",
            link: Path.faq,
          },
          {
            label: "Coming Soon",
            icon: "icon-loader-circle",
            link: Path.comingSoon,
          },
          {
            label: "Maintenance",
            icon: "icon-traffic-cone",
            link: Path.maintenance,
          },
          {
            label: "Privacy Policy",
            icon: "icon-file-lock",
            link: Path.privacyPolicy,
          },
          {
            label: "Terms & Conditions",
            icon: "icon-file-check",
            link: Path.termsConditions,
          },
          {
            label: "Starter Page",
            icon: "icon-file",
            link: Path.starterPage,
          },
        ],
      },
    ],
  },
  {
    id: "ui-elements",
    mainicon: "ph-diamonds-four",
    menutitle: "UI Elements",
    submenuSections: [
      {
        title: "UI Interface",
        items: [
          {
            label: "Base UI",
            icon: "icon-palette",
            submenu: [
              { label: "Alerts", link: Path.uiAlerts },
              { label: "Accordion", link: Path.uiAccordion },
              { label: "Avatar", link: Path.uiAvatar },
              { label: "Badges", link: Path.uiBadges },
              { label: "Buttons", link: Path.uiButtons },
              { label: "Button Group", link: Path.uiButtonsGroup },
              { label: "Breadcrumb", link: Path.uiBreadcrumb },
              { label: "Card", link: Path.uiCards },
              { label: "Colors", link: Path.uiColors },
              { label: "Collapse", link: Path.uiCollapse },
              { label: "Dropdowns", link: Path.uiDropdowns },
              { label: "Grid", link: Path.uiGrid },
              { label: "Images", link: Path.uiImages },
              { label: "Modals", link: Path.uiModals },
              { label: "Offcanvas", link: Path.uiOffcanvas },
              { label: "Pagination", link: Path.uiPagination },
              { label: "Progress", link: Path.uiProgress },
              { label: "Tabs", link: Path.uiNavTabs },
              { label: "Toasts", link: Path.uiToasts },
              { label: "Typography", link: Path.uiTypography },
            ],
          },
          {
            label: "Advanced UI",
            icon: "icon-swatch-book",
            submenu: [
              { label: "Dragula", link: Path.uiDragula },
              { label: "Clipboard", link: Path.uiClipboard },
              { label: "Range Slider", link: Path.uiRangeslider },
              { label: "Lightbox", link: Path.uiLightbox },
            ],
          },
          {
            label: "Forms",
            icon: "icon-text-cursor-input",
            submenu: [
              { label: "Form Elements", link: Path.formElements },
              { label: "Select2", link: Path.formSelect2 },
              { label: "Form Editor", link: Path.formEditors },
              { label: "Form Picker", link: Path.formPickers },
            ],
          },
          {
            label: "Tables",
            icon: "icon-wand-sparkles",
            submenu: [
              { label: "Basic Tables", link: Path.tablesBasic },
              { label: "Data Table", link: Path.dataTables },
            ],
          },
          {
            label: "Charts",
            icon: "icon-chart-column-stacked",
            submenu: [
              { label: "Apex Charts", link: Path.chartApex },
            ],
          },
          {
            label: "Icons",
            icon: "icon-shapes",
            submenu: [
              { label: "Fontawesome Icons", link: Path.iconFontawesome },
              { label: "Tabler Icons", link: Path.iconTabler },
              { label: "Lucide", link: Path.iconLucide },
              { label: "Phosphor", link: Path.iconPhosphor },
            ],
          },
          {
            label: "Widgets",
            icon: "icon-arrow-down-wide-narrow",
            link: Path.widgets,
          },
          {
            label: "Multilevel",
            icon: "icon-menu",
            submenu: [
              { label: "Multilevel 1", link: Path.multilevel1 },
              {
                label: "Multilevel 2",
                submenu: [
                  { label: "Multilevel 2.1", link: Path.multilevel21 },
                  {
                    label: "Multilevel 2.2",
                    submenu: [
                      { label: "Multilevel 2.2.1", link: Path.multilevel221 },
                      { label: "Multilevel 2.2.2", link: Path.multilevel222 },
                    ],
                  },
                ],
              },
              { label: "Multilevel 3", link: Path.multilevel3 },
            ],
          },
        ],
      },
    ],
  },
];
