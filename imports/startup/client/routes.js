import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Creating from '/imports/ui/components/creating/Creating';
import ListCourses from '/imports/ui/components/courses/ListCourses';
import Cards from '/imports/ui/components/courses/Cards';
import '/imports/ui/stylesheets/overallStyle.css';
import '/imports/ui/stylesheets/homePageOne.css';
import '/imports/ui/stylesheets/creating.css';
import '/imports/ui/stylesheets/main.css';
import '/imports/ui/stylesheets/homePageCard.css';

class MainLayout extends Component {
	render() {
		return (
			<div>
				<div>{this.props.children}</div>
			</div>
		)
	}
};

const Routes = () => (
	<div>
		<Router>
			<MainLayout>
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/all-courses" />} />
					<Route exact path="/courses-list" component={ListCourses} />
					<Route exact path="/creating" component={Creating} />
					<Route exact path="/courses-card" component={Cards} />
				</Switch>
			</MainLayout>
		</Router>
	</div>
);

export default Routes;
