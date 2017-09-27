import React, { Component } from 'react';
import GroupList from './GroupList/GroupList.js';
import ProjectList from './ProjectList/ProjectList.js';
import MemberList from './MemberList/MemberList.js';
import GroupLog from './GroupLog/GroupLog.js';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Tabs, Layout } from 'antd';
const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
import { fetchNewsData } from '../../reducer/modules/news.js';
import './Group.scss';
@connect(
  
  state => {
    return {
      curGroupId: state.group.currGroup._id,
      curUserRole: state.group.currGroup.role
    }
  },
  {
    fetchNewsData: fetchNewsData
  }
)
export default class Group extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    fetchNewsData: PropTypes.func,
    curGroupId: PropTypes.number,
    curUserRole: PropTypes.string
  }
  onTabClick(key){
    if(key == 3){
      this.props.fetchNewsData(this.props.curGroupId, "group", 1, 10)
    }
  }
  render () {
    const GroupContent = (
      <Layout style={{minHeight: 'calc(100vh - 100px)', marginLeft: '24px', marginTop: '24px'}}>
        <Sider style={{ height: '100%', overflowY: 'scroll'}} width={300}>
          <div className="logo" />
          <GroupList></GroupList>
        </Sider>
        <Layout>
          <Content style={{ height: '100%', margin: '0 24px 0 16px', overflow: 'initial',backgroundColor: '#fff'}}>
            <Tabs onTabClick={this.onTabClick.bind(this)} type="card" className="m-tab" style={{height: '100%'}}>
              <TabPane tab="项目列表" key="1"><ProjectList/></TabPane>
              <TabPane tab="成员列表" key="2"><MemberList/></TabPane>
              {["admin","owner","guest","dev"].indexOf(this.props.curUserRole)>-1?<TabPane tab="分组动态" key="3"><GroupLog/></TabPane>:""}
            </Tabs>
          </Content>
        </Layout>
      </Layout>
    )
    return (
      <div className="projectGround">
        <Switch>
          <Redirect exact from="/group" to="/group/0" />
          <Route path="/group/:groupId" render={() => GroupContent} />
        </Switch>
      </div>
    )
  }
}
