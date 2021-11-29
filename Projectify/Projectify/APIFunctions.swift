//
//  APIs.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import Foundation
import Alamofire

class APIFunctions {
    
    static var userID:String = ""
    static var userToken:String = ""
    static var userName:String = ""
    static var userEmail:String = ""
    static var userPic:String = ""
    
    static var loginStatus:String = ""
    static var registerSatus:String = ""
    static var selectedProjectID:String = ""
    static var numberOfProjects:Int = 0

    
    let url:String = "https://projectify-pm.herokuapp.com/api/"
        
    func registerUser(params:Parameters) -> Int {
        
        registerRequest(params: params)
        if (APIFunctions.registerSatus == "pass") {
            return 0
        }
        else if (APIFunctions.registerSatus == "User Already Exist") {
            return 1
        } else {
            return -1
        }
    }
    
    func registerRequest(params:Parameters) {
        AF.request(url + "users/register", method: .post, parameters: params, encoding: JSONEncoding.default, headers: nil).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                
                let errors:[String] = ["User Already Exist"]
                if prettyPrintedJson.contains(errors[0]) {
                    APIFunctions.registerSatus = errors[0]
                    return
                } else {
                    APIFunctions.registerSatus = "pass"
                }
                
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    let userInfo = try decoder.decode(User.self, from: jsonData)
                    APIFunctions.userID = userInfo._id
                    APIFunctions.userToken = userInfo.token
                    APIFunctions.userName = userInfo.name
                    APIFunctions.userEmail = userInfo.email
                    APIFunctions.userPic = userInfo.pic
                                        
                } catch {
                    print(String(describing: error))
                }
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    public func loginUser(params:Parameters) -> Int {
        
        loginRequest(params: params)
        
        if (getLoginStatus() == "pass") {
            return 0
        } else if (getLoginStatus() == "Invalid Email or Password") {
            return 1
        } else {
            return -1
        }
    }
    
    func loginRequest(params:Parameters) -> Void {
        AF.request(url + "users/login", method: .post, parameters: params, encoding: JSONEncoding.default, headers: nil).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                
                let errors:[String] = ["Invalid Email or Password"]
                if prettyPrintedJson.contains(errors[0]) {
                    APIFunctions.loginStatus = errors[0]
                    return
                } else {
                    APIFunctions.loginStatus = "pass"
                }
                
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    let userInfo = try decoder.decode(User.self, from: jsonData)
                    APIFunctions.userID = userInfo._id
                    APIFunctions.userToken = userInfo.token
                    APIFunctions.userName = userInfo.name
                    APIFunctions.userEmail = userInfo.email
                    APIFunctions.userPic = userInfo.pic

                } catch {
                    print(String(describing: error))
                }
            } catch {
                print("Error: Trying to convert JSON data to string")
                return
            }
        }
    }
    
    func getLoginStatus() -> String {
        return APIFunctions.loginStatus
    }
    
    func getRegisterStatus() -> String {
        return APIFunctions.registerSatus
    }
    
    func getUserID() -> String {
        return APIFunctions.userID
    }
    
    func setUserID(id:String) -> Void {
        APIFunctions.userID = id
    }
    
    func getUserToken() -> String {
        return APIFunctions.userToken
    }
    
    func setUserToken(token:String) -> Void {
        APIFunctions.userToken = token
    }
    
    func getUserName() -> String {
        return APIFunctions.userName
    }
    
    func setUserName(name:String) -> Void {
        APIFunctions.userEmail = name
    }
    
    func getUserEmail() -> String {
        return APIFunctions.userEmail
    }
    
    func setUserEmail(email:String) -> Void {
        APIFunctions.userEmail = email
    }
    
    func getUserPic() -> String {
        return APIFunctions.userPic
    }
    
    func setUserPic(pic:String) -> Void {
        APIFunctions.userPic = pic
    }
    
    func getSelectedProjectId() -> String {
        return APIFunctions.selectedProjectID
    }
    
    func setSelectedProjectId(id:String) -> Void {
        APIFunctions.selectedProjectID = id
    }
    
    func getNumberOfProjects() -> Int {
        return APIFunctions.numberOfProjects
    }
    
    func setNumberOfProjects(count:Int) -> Void {
        APIFunctions.numberOfProjects = count
    }
    
    func newProject(title:String, category:String, description:String, dueDate:String) {
        
        print(getUserToken())
        
        let newProjectParams:Parameters = [
            "title": title,
            "category": category,
            "content": description,
            "dueDate": dueDate,
            "favorite": false,
            "user":getUserID()
        ]
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
    
        AF.request(url + "notes/create", method: .post, parameters: newProjectParams, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func editProject(newTitle:String, newCategory:String, newDescription:String, newDueDate:String) -> Void {
        
        let editProjectParameters:Parameters = [
            "title": newTitle,
            "category": newCategory,
            "content": newDescription,
            "dueDate": newDueDate,
            "favorite": false,
            "_id":getSelectedProjectId()
        ]
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        AF.request(url + "notes/" + getSelectedProjectId(), method: .put, parameters: editProjectParameters, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func deleteProject(id:String) {
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        let param:Parameters = [
            "_id":id
        ]
        
        AF.request(url + "notes/" + id, method: .delete, parameters: param, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func favoriteProject(Title:String, Category:String, Description:String, DueDate:String) -> Void {
        
        let favoriteProjectParameters:Parameters = [
            "title": Title,
            "category": Category,
            "content": Description,
            "dueDate": DueDate,
            "favorite": true,
            "_id":getSelectedProjectId()
        ]
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        AF.request(url + "notes/" + getSelectedProjectId(), method: .put, parameters: favoriteProjectParameters, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func editProfile(editProfileParaameters:Parameters) -> Void {
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        AF.request(url + "users/profile", method: .post, parameters: editProfileParaameters, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                
                let errors:[String] = ["Invalid Email or Password"]
                if prettyPrintedJson.contains(errors[0]) {
                    APIFunctions.loginStatus = errors[0]
                    return
                }
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    let userInfo = try decoder.decode(User.self, from: jsonData)
                    APIFunctions.userID = userInfo._id
                    APIFunctions.userToken = userInfo.token
                    APIFunctions.userName = userInfo.name
                    APIFunctions.userEmail = userInfo.email
                    APIFunctions.userPic = userInfo.pic
                } catch {
                    print(String(describing: error))
                }
                APIFunctions.loginStatus = "pass"
            } catch {
                print("Error: Trying to convert JSON data to string")
                return
            }
        }
    }
    
    
}
