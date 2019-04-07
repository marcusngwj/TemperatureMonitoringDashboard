import DashboardPresenter from '/imports/presenter/DashboardPresenter';
import DashboardModel from '/imports/model/DashboardModel'; 
import DashboardView from '/imports/ui/layouts/DashboardView'

dashboardModel = new DashboardModel();

dashboardPresenter = new DashboardPresenter(DashboardView, dashboardModel);
