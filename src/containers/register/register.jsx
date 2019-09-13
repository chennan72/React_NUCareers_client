/*
注册的路由组件
 */

import React, {Component} from 'react'
import {Button, InputItem, List, NavBar, Radio, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',  // 用户名
        password: '',  // 密码
        password2: '',  // 确认密码
        type: 'laoban',  // 用户类型名称   dashen/laoban
    }

    // 点击注册调用
    register = () => {
        //console.log(this.state)
        this.props.register(this.state)
    }

    // 处理输入数据的改变: 更新对应的状态
    handleChange = (name, val) => {
        // 更新状态
        this.setState({
            [name]: val  // 属性名不是name, 而是name变量的值
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const {type} = this.state
        const {msg, redirectTo} = this.props.user
        // 如果redirectTo有值, 就需要重定向到指定的路由
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>NUCareers</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='Username' onChange={val => {
                            this.handleChange('username', val)
                        }}>Username:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='Password' type="password" onChange={val => {
                            this.handleChange('password', val)
                        }}>Password:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='Please verify your password' type="password" onChange={val => {
                            this.handleChange('password2', val)
                        }}>Verification:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>User Type:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'}
                                   onChange={() => this.handleChange('type', 'dashen')}>Candidate</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'}
                                   onClick={() => this.handleChange('type', 'laoban')}>Employer</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>Sign Up</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>Already have an account</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)
