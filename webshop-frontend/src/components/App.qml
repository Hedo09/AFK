import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtQuick.Window 2.2

Window {
  width: 400
  height: 500
  visible: true

  ColumnLayout {
    width: 200
    x: (Window.width - width) / 2
    y: (Window.height - height) / 2

    Text {
      text: "Welcome to React QML"
      Layout.fillWidth: true
      font.pointSize: 20
    }

    Text {
      text: "To get started, edit App.qml"
      color: "#333333"
      Layout.fillWidth: true
    }
  }
}