"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { Registration } from "@/types";
import * as XLSX from "xlsx";

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      loadRegistrations(token);
    }
  }, []);

  const loadRegistrations = async (token: string) => {
    try {
      const response = await api.getRegistrations(token);
      setRegistrations(response || []);
    } catch (err) {
      console.error("Failed to load registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (registrations.length === 0) return;

    const data = registrations.map((reg, index) => ({
      序号: index + 1,
      姓名: reg.name,
      联系方式: reg.contact,
      项目介绍: reg.projectDescription,
      GitHub地址: reg.githubUrl || "无",
      创建时间: formatDate(reg.createdAt),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "报名列表");

    ws["!cols"] = [
      { wch: 6 },
      { wch: 15 },
      { wch: 20 },
      { wch: 50 },
      { wch: 40 },
      { wch: 20 },
    ];

    XLSX.writeFile(
      wb,
      `报名列表_${new Date().toLocaleDateString("zh-CN").replace(/\//g, "-")}.xlsx`,
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>报名管理</CardTitle>
          <Button
            variant="outline"
            onClick={exportToExcel}
            disabled={registrations.length === 0}
          >
            导出 Excel
          </Button>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <p className="text-center text-gray-500 py-8">暂无报名数据</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>姓名</TableHead>
                  <TableHead>联系方式</TableHead>
                  <TableHead className="max-w-xs">项目介绍</TableHead>
                  <TableHead>GitHub</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.name}</TableCell>
                    <TableCell>{reg.contact}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {reg.projectDescription}
                    </TableCell>
                    <TableCell>
                      {reg.githubUrl ? (
                        <a
                          href={reg.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          查看
                        </a>
                      ) : (
                        <span className="text-gray-400">无</span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(reg.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRegistration(reg)}
                      >
                        详情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedRegistration}
        onOpenChange={() => setSelectedRegistration(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>报名详情</DialogTitle>
            <DialogDescription>查看完整报名信息</DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  姓名
                </label>
                <p className="mt-1">{selectedRegistration.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  联系方式
                </label>
                <p className="mt-1">{selectedRegistration.contact}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  项目介绍
                </label>
                <p className="mt-1 whitespace-pre-wrap">
                  {selectedRegistration.projectDescription}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  GitHub 地址
                </label>
                {selectedRegistration.githubUrl ? (
                  <a
                    href={selectedRegistration.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-blue-600 hover:underline block"
                  >
                    {selectedRegistration.githubUrl}
                  </a>
                ) : (
                  <p className="mt-1 text-gray-400">无</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  创建时间
                </label>
                <p className="mt-1">{selectedRegistration.createdAt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
