//
//  PatchIssue.swift
//  issue-tracker
//
//  Created by 양준혁 on 2021/06/22.
//

import Foundation

struct PatchIssue: Encodable {
    let issueNumber: [Int]
    let isOpen: Bool
}