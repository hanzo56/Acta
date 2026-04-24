import { Navigate, Route, Routes } from 'react-router-dom'
import { ConnectorsPage } from './pages/ConnectorsPage'
import { GraphMenuPage } from './pages/GraphMenuPage'
import { GraphPage } from './pages/GraphPage'
import { DraftResearchMemoGraphPage } from './pages/DraftResearchMemoGraphPage'
import { InvestorCallsGraphPage } from './pages/InvestorCallsGraphPage'
import { HomePage } from './pages/HomePage'
import { PhoneUpdateGraphPage } from './pages/PhoneUpdateGraphPage'
import { PhoneUpdatePreviewPage } from './pages/PhoneUpdatePreviewPage'
import { AccountDetailsPage } from './pages/AccountDetailsPage'
import { ProfileNotificationsPage } from './pages/ProfileNotificationsPage'
import { ProfilePrivacyPage } from './pages/ProfilePrivacyPage'
import { ProfileSettingsPage } from './pages/ProfileSettingsPage'
import { ProfileSubscriptionPage } from './pages/ProfileSubscriptionPage'
import { PreviewPage } from './pages/PreviewPage'
import { ValentineGraphPage } from './pages/ValentineGraphPage'
import { ValentinePreviewPage } from './pages/ValentinePreviewPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="/preview/update" element={<PhoneUpdatePreviewPage />} />
      <Route path="/preview/valentine" element={<ValentinePreviewPage />} />
      <Route path="/graph" element={<GraphPage />} />
      <Route path="/graph/phone-update" element={<PhoneUpdateGraphPage />} />
      <Route path="/graph/investor-calls" element={<InvestorCallsGraphPage />} />
      <Route path="/graph/draft-research-memo" element={<DraftResearchMemoGraphPage />} />
      <Route path="/graph/menu" element={<GraphMenuPage />} />
      <Route path="/graph/valentine" element={<ValentineGraphPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />
      <Route path="/profile/account" element={<AccountDetailsPage />} />
      <Route path="/profile/subscription" element={<ProfileSubscriptionPage />} />
      <Route path="/profile/notifications" element={<ProfileNotificationsPage />} />
      <Route path="/profile/privacy" element={<ProfilePrivacyPage />} />
      <Route path="/connectors" element={<ConnectorsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
