import program from 'commander'
import symbol from 'log-symbols'
import chalk from 'chalk'

import create from './create' // 项目创建
import init from './init' // 项目初始化
import dev from './dev' // 项目启动
import build from './build' // 项目打包

let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    usages: [// 使用方法
      'd-template-cli create ProjectName',
      'dt-cli create ProjectName',
      'dtc create ProjectName'
    ],
    alias: 'c' // 命令简称
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'd-template-cli init',
      'dt-cli init',
      'dtc init'
    ],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
      'd-template-cli dev',
      'dt-cli dev',
      'dtc dev'
    ],
    options: [
      {
        flags: '-p --port <port>',
        description: '端口',
        defaultValue: 3000
      }
    ],
    alias: 'd'
  },
  // 打包
  build: {
    description: '服务端项目打包',
    usages: [
      'd-template-cli build',
      'dt-cli build',
      'dtc build'
    ],
    options: [
      {
        flags: '-u --username <port>',
        description: 'github用户名',
        defaultValue: ''
      },
      {
        flags: '-t --token <port>',
        description: 'github创建的token',
        defaultValue: ''
      }
    ]
    alias: 'd'
  }
}

// 添加create,init,dev命令
Object.keys(actionMap).forEach(action => {
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option]

      program.option(obj.flags, obj.description, obj.defaultValue)
    })
  }

  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'create':
          create(...process.argv.slice(3))
          break;
        case 'init':
          init(program.username, program.token)
          break;
        case 'dev':
          dev(program.port)
          break;
        case 'build':
          build()
          break;
        default:
          break;
      }
    })
})

// 项目版本
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv)

// d-template-cli命令后不带参数的时候，输出辅助信息
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
